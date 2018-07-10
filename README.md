# iota-vanity-address-finder
Finds IOTA seeds that generate the desired addresses. Utilizes parallelism to find the seed as quickly as possible.

## Usage as Library

In project directory:
```bash
npm i iota-vanity-address-finder
```
Then in code:
```javascript
const SeedFinder = require('iota-vanity-address-finder')

SeedFinder.findSeedAndAddressWith({ vanityString, vanityStringPosition, cpuCount }).then(({ vanitySeed, vanityAddress }) => {
    console.log(vanitySeed)
    console.log(vanityAddress)
})
```

## Command Line Usage

Install globally from npm with:
```bash
npm i -g iota-vanity-address-finder
```

or install globally from GitHub with:
```bash
npm i -g pRizz/iota-vanity-address-finder
```

Usage:
```
> iota-vanity-address-finder --help

  Usage: iota-vanity-address-finder [options] <vanityString>

  Finds IOTA seeds that generate the desired addresses

  Options:

    -V, --version         output the version number
    -p, --prefix          search for the vanity string as a prefix of the address. This is the default search position.
    -s, --suffix          search for the vanity string as a suffix of the address.
    -c, --contains        search for the vanity string anywhere in the address.
    -a, --aggressive-CPU  use all available cores. By default, uses one less than all cores to reduce CPU starvation.
    -b, --half-CPU        only use half of available cores.
    -h, --help            output usage information

```

To find an address with a vanity prefix:
```bash
iota-vanity-address-finder --prefix myvanity
```
To find an address with a vanity suffix:
```bash
iota-vanity-address-finder --suffix myvanity
```
To find an address containing a vanity string:
```bash
iota-vanity-address-finder --contains myvanity
```

## Security

All seeds are generated with the proper cryptographic functions. Nothing is sent to any backend, but to ensure this, turn off your internet while searching for a seed and uninstall the tool afterwards.

If you want to output to a file instead of standard out, then just redirect the output like so:
```bash
iota-vanity-address-finder --contains myvanity > vanityOutput.txt
```

## MIT Licensed

## Tips
All tips are greatly appreciated and help me, Peter Ryszkiewicz, aka `pRizz`, support the development of more apps.

IOTA: `PRIZ9SWUXJLZKRPUYESORIZXVANRQUUGURDE9HXWOLNLGJOQHQSVEQYUM9GJTTAVKKTSUDWKCCBLCMAFAQARGOXPXW`

NANO: `xrb_3fwbzdazf6wmmy17agkzp47f75d5hdm5m91bxexp9auowm8m9a7tsk8prizz`
