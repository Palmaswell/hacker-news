# Hacker Digest

> Read the latest Hacker News fast and reliably under any network condition.

[![CircleCI](https://circleci.com/gh/Palmaswell/hacker-news.svg?style=svg)](https://circleci.com/gh/Palmaswell/hacker-news)

## Motivation

Everyone loves getting their news fast and reliably. The Hacker Digest is an early-stage proof-of-concept for a single-page application that fetches the latest 500 Hacker News and displays them as quickly as possible. It offers offline functionality for you to read your latest news under any network condition.

## Development

### Requirements

🚀 Node.js >=10
🌲 Git
🐈 yarn >= 1.12

### Getting started

After cloning the repository, getting the project running is a matter of two commands `yarn install` and `yarn dev`.

```sh
git clone git@github.com:Palmaswell/hacker-news.git

cd hacker-news

# Install packages
yarn

# Run Webpack Server
yarn dev
```

### Commands

The list of most important commands to work with the selected workspace.

| Commands             | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| `yarn build`         | Compile TypeScript into JavaScript and create a production ready bundle |
| `yarn clean`         | Remove compiled bundle                                                  |
| `yarn dev`           | Starts a development Webpack server                                     |
| `yarn lint`          | Lint the project according to the Eslint configuration                  |
| `yarn test`          | Run unit tests written with Jest                                        |
| `yarn test:coverage` | Collects Jest coverage information                                      |
| `yarn watch`         | Recompile on file changes                                               |
