{
  "name": "{{projectName}}",
  "private": true,
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "alita dev",
    "build": "alita build",
    "lint": "npm run lint:js && npm run lint:style && npm run lint:prettier",
    "lint-staged": "lint-staged",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",
    "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src && npm run lint:style",
    "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "lint:prettier": "prettier --check \"**/*\" --end-of-line auto",
    "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",
    "prettier": "prettier -c --write \"**/*\""
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@ant-design/icons": "^4.1.0",
    "@ant-design/pro-layout": "^6.0.0-4",
    "@ant-design/pro-table": "^2.3.0",
    "@umijs/route-utils": "^1.0.12",
    "alita": "^2.6.16",
    "classnames": "^2.2.6"
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node scripts/verifyCommit.js"
  },
  "lint-staged": {
    "src/**/*.less": "stylelint --syntax less",
    "src/**/*.{js,jsx}": "npm run lint-staged:js",
    "src/**/*.{js,ts,tsx,json,jsx,less}": [
      "npm run prettier",
      "git add"
    ]
  },
  "devDependencies": {
    "@types/express": "^4.17.2",
    "@umijs/fabric": "2.0.0",
    "chalk": "^3.0.0",
    "cross-env": "^6.0.3",
    "eslint": "6.8.0",
    "eslint-plugin-eslint-comments": "^3.1.2",
    "express": "^4.17.1",
    "lint-staged": "^9.5.0",
    "prettier": "^2.0.2",
    "stylelint": "^12.0.1",
    "yorkie": "^2.0.0"
  }
}
