# @alitajs/native

[![NPM version](https://img.shields.io/npm/v/@alitajs/native.svg?style=flat)](https://npmjs.org/package/@alitajs/native) [![NPM downloads](http://img.shields.io/npm/dm/@alitajs/native.svg?style=flat)](https://npmjs.org/package/@alitajs/native)

## Install

```bash
yarn add @alitajs/native
```

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [['@alitajs/native']],
};
```

### Init native

Initialize Capacitor configuration by providing an app name, app ID, and an optional web directory for the existing web app.

```bash
npx alita native init <appName> <appID>
```

<strong>Inputs:</strong>

- `appName` (required): The application's name
- `appID` (required): The application's App ID; something like `com.example.appname`

<strong>Options:</strong>

- `--web-dir <value>`: The existing web application to use with initialization, default `dist`

### Add platform

Add a native platform project to your app.

```bash
npx alita native add <platform>
```

<strong>Inputs:</strong>

- `platform` (required): `android`, `ios`

### Plugins

- [Official plugins](https://github.com/ionic-team/capacitor-plugins)
- [Community plugins](https://github.com/capacitor-community)

### Live reload

Within `capacitor.config.json`, create a `server` entry then configure the `url` field using the local web server's IP address and port:

```js
"server": {
  "url": "http://192.168.1.68:8000",
  "cleartext": true
},
```

### Build web

You may need to build the web when you public app

```bash
yarn build
```

### Copy assets

Copy the web app build and Capacitor configuration file into the native platform project. Run this each time you make changes to your web app or change a configuration value.

```bash
npx alita native copy [<platform>]
```

<strong>Inputs:</strong>

- `platform` (optional): `android`, `ios`

### Update native

Updates the native plugins and dependencies referenced in `package.json`.

```bash
npx alita native update [<platform>]
```

<strong>Inputs:</strong>

- `platform` (optional): `android`, `ios`

<strong>Options:</strong>

- `--deployment`: Podfile.lock won't be deleted and pod install will use `--deployment` option.

### Sync project

This command runs `copy` and then `update`.

```bash
npx alita native sync [options] [<platform>]
```

<strong>Inputs:</strong>

- `platform` (optional): `android`, `ios`

<strong>Options:</strong>

- `--deployment`: Podfile.lock won't be deleted and pod install will use `--deployment` option.

### Run project

```bash
npx alita native run [options] <platform>
```

<strong>Inputs:</strong>

- `platform` (required): `android`, `ios`

<strong>Options:</strong>

- `--list`: Print a list of target devices available to the given platform
- `--target <id>`: Run on a specific target device

## Contributing

```bash
yarn
```

```bash
yarn build --watch
yarn start
```

## LICENSE

MIT
