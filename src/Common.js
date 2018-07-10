const maxVanityLength = 81
const validCharsetRegex = /^[A-Z9]+$/ // trytes

function isValidVanityString({ vanityString }) {
    if(!vanityString || vanityString.length > maxVanityLength) {
        return false
    }
    return validCharsetRegex.test(vanityString)
}

module.exports = {
    maxVanityLength,
    isValidVanityString
}