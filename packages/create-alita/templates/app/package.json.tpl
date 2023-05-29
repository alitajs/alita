{
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "alita build",
    "dev": "alita dev",
    "format": "prettier --write .",
    "lint-staged": "lint-staged",
    "lint-staged:js": "eslint --ext .ts,.tsx",
    "plugin": "alita plugin list",
    "start": "alita dev",
    "test": "jest"
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
    "@alita/flow": "^3.1.1",
    "alita": "^3.2.27",
    "antd-mobile": "^5.15.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13",
    "@types/jest": "^27",
    "@types/react": "^18.0.15",
    "@types/react-dom": "^18.0.6",
    "@types/testing-library__jest-dom": "^5.14.5",
    "jest": "^27",
    "prettier": "^2",
    "ts-node": "^10",
    "typescript": "^4"
  },
  "engines": {
    "node": ">=14.0.1"
  },
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "alita verify-commit"
  }
}
