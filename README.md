QObyte (@quasar/obyte)
===
![official icon](https://img.shields.io/badge/Quasar%201.0-Official%20App%20Extension-blue.svg)
![npm (scoped)](https://img.shields.io/npm/v/@quasar/quasar-app-extension-obyte.svg)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/quasarframework/app-extension-obyte.svg)]()
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/quasarframework/app-extension-obyte.svg)]()
[![npm](https://img.shields.io/npm/dt/@quasar/quasar-app-extension-obyte.svg)](https://www.npmjs.com/package/@quasar/quasar-app-extension-obyte)

QObyte is an extension aimed to ease the interactions with the Obyte blockchain using the library [obytejs](https://github.com/bonustrack/obyte.js).

# Install
```bash
quasar ext add @quasar/obyte
```
Quasar CLI will retrieve it from NPM and install the extension.

# Environment variables

This extension uses 2 environment variables. You can set either

```bash
OBYTE_API="wss://..."
```
for the main net

or, for the test net

```bash
OBYTE_TESTNET_API="wss://..."
```

Notice the quotes, don't forget them.



# Uninstall
```bash
quasar ext remove @quasar/obyte
```

# Demo
There is a demo located at `test/app`. To run it:
```bash
$ git clone 
```

# Info
The obyte client is now available as a Vue prototype. You can access it in a Vue component this way

```bash
this.$obyte
```



# Donate
If you appreciate the work that went into this App Extension, please consider [donating to Quasar](https://donate.quasar.dev).
