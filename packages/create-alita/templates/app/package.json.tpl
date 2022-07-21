{
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "alita build",
    "format": "prettier -c --write \"**/*\"",
    "lint": "alita lint",
    "lint-staged": "lint-staged",
    "lint:cssinjs": "alita lint --stylelint-only --cssinjs",
    "lint:es": "alita lint --eslint-only",
    "lint:es-fix": "alita lint --eslint-only --fix",
    "lint:style": "alita lint --stylelint-only",
    "lint:style-fix": "alita lint --stylelint-only --fix",
    "start": "alita dev"
  },
  "lint-staged": {
    "**/*.{ts,tsx}": "alita lint",
    "**/*.{ts,tsx,json,jsx,less}": [
      "git add",
      "prettier --write"
    ]
  },
  "dependencies": {
    "@alita/flow": "^3.0.0",
    "alita": "^{{{ version }}}",
    "antd-mobile": "^5.16.1",
    "antd-mobile-icons": "^0.2.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/jest": "^27.4.0",
    "@types/node": "^17.0.19",
    "@types/react": "^17.0.39",
    "@types/react-dom": "^17.0.13",
    "cross-env": "^7.0.3",
    "husky": "^7.0.4",
    "lint-staged": "^11.1.2",
    "prettier": "^2",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "typescript": "^4",
    "yorkie": "^2.0.0"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "alita verify-commit"
  }
}
