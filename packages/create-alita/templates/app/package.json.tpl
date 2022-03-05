{
  "name": "alita-pro",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "alita build",
    "dev": "alita dev",
    "format": "prettier --write .",
    "lint-staged": "lint-staged",
    "lint-staged:js": "eslint --ext .ts,.tsx",
    "plugin": "alita plugin list",
    "start": "alita dev"
  },
  "lint-staged": {
    "**/*.less": "stylelint --syntax less",
    "**/*.css": "stylelint --syntax css",
    "**/*.{ts,tsx}": "npm run lint-staged:js",
    "**/*.{ts,tsx,json,jsx,less}": [
      "git add",
      "prettier --write"
    ]
  },
  "dependencies": {
    "@alita/flow": "3.0.0-beta.3",
    "alita": "^{{{ version }}}",
    "antd-mobile-icons": "^0.2.2"
  },
  "devDependencies": {
    "@types/jest": "^27.4.0",
    "@types/node": "^17.0.19",
    "@types/react": "^17.0.39",
    "@types/react-dom": "^17.0.13",
    "@umijs/fabric": "2.6.4",
    "cross-env": "^7.0.3",
    "eslint": "^7.32.0",
    "husky": "^7.0.4",
    "jest": "^27.5.1",
    "lint-staged": "^11.1.2",
    "prettier": "^2.5.1",
    "prettier-plugin-organize-imports": "^2.3.4",
    "prettier-plugin-packagejson": "^2.2.15",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "stylelint": "^13.13.1",
    "typescript": "^4.1.3",
    "yorkie": "^2.0.0"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "authors": [
    "xiaohuoni <448627663@qq.com> (https://github.com/xiaohuoni)"
  ],
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "fabric verify-commit"
  }
}
