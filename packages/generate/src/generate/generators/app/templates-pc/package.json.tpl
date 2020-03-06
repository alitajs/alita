{
  "name": "{{projectName}}",
  "private": true,
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "alita dev",
    "build": "alita build",
    "cordova-init": "alita cordova --init",
    "cordova-add-ios": "alita cordova --ios",
    "cordova-add-android": "alita cordova --android",
    "start-ios": "alita dev",
    "build-ios": "alita build",
    "start-android": "cross-env CORDOVA=android alita dev",
    "build-android": "cross-env CORDOVA=android alita build",
    "lint": "npm run lint:js && npm run lint:style && npm run lint:prettier",
    "lint-staged": "lint-staged",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",
    "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src && npm run lint:style",
    "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "lint:prettier": "check-prettier lint",
    "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",
    "prettier": "prettier -c --write \"**/*\""
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@alitajs/alita-layout": "^1.1.2",
    "@alitajs/list-view": "^0.0.4",
    "alita": "^2.1.2"
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node scripts/verifyCommit.js"
  },
  "lint-staged": {
    "**/*.less": "stylelint --syntax less",
    "**/*.{js,jsx}": "npm run lint-staged:js",
    "**/*.{js,ts,tsx,json,jsx,less}": [
      "npm run prettier",
      "git add"
    ]
  },
  "devDependencies": {
    "@types/express": "^4.17.2",
    "@umijs/fabric": "2.0.0",
    "chalk": "^3.0.0",
    "check-prettier": "^1.0.3",
    "cross-env": "^6.0.3",
    "eslint": "6.8.0",
    "eslint-plugin-eslint-comments": "^3.1.2",
    "express": "^4.17.1",
    "lint-staged": "^9.5.0",
    "stylelint": "^12.0.1",
    "yorkie": "^2.0.0"
  }
}
