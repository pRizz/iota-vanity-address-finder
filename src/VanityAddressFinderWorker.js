/*!
 * iota-vanity-address-finder
 * Copyright(c) 2018 Peter Ryszkiewicz
 * MIT Licensed
 */

const IOTALib = require('iota.lib.js')
const SeedGenerator = require('secure-iota-seed-generator')
const VanityStringPosition = require('./VanityStringPosition')

const iota = new IOTALib({})

async function getSeedAndAddressForVanityString({ vanityString, vanityPredicate }) {
    let vanitySeed = null
    let vanityAddress = null
    do {
        const seed = SeedGenerator.generateSeed()
        const address = await getSingleAddressFromSeed({ seed })
        if(vanityPredicate(address, vanityString)) {
            vanitySeed = seed
            vanityAddress = address
        }
        process.send({ check: true })
    } while(!vanitySeed)

    return { vanitySeed, vanityAddress }
}

async function getSingleAddressFromSeed({ seed }) {
    return new Promise((resolve, reject) => {
        iota.api.getNewAddress(seed, {
            total: 1
        }, (error, addresses) => {
            if(error) {
                return reject(error)
            }

            resolve(addresses[0])
        })
    })
}

function vanityPredicateForPosition({ vanityStringPosition }) {
    switch (vanityStringPosition) {
        case VanityStringPosition.anywhere: return (address, vanityString) => address.includes(vanityString)
        case VanityStringPosition.prefix: return (address, vanityString) => address.startsWith(vanityString)
        case VanityStringPosition.suffix: return (address, vanityString) => address.endsWith(vanityString)
    }
    throw 'Error: unknown vanity position'
}

process.on('message', async (message) => {
    const { vanityString, vanityStringPosition } = message
    const vanityPredicate = vanityPredicateForPosition({ vanityStringPosition })
    const vanitySeedAndAddress = await getSeedAndAddressForVanityString({ vanityString, vanityPredicate })

    process.send(vanitySeedAndAddress)
})

