# Repo for Cocos Creator User Manual

- Cocos Creator User Manual: [https://docs.cocos.com](https://docs.cocos.com)
- Cocos Engine Official Website：[https://www.cocos.com](https://www.cocos.com/)

## Install Node Modules

```sh
npm install
```

## Generate Sidebar

node ./scripts/create-sidebar.js versions/4.0/zh/SUMMARY.md

node ./scripts/create-sidebar.js versions/4.0/en/SUMMARY.md

## Run In Dev Mode

npx vitepress dev versions/4.0

## Build

node ./scripts/publish.js --version=versions/4.0

## Build All

node ./scripts/publish.js --version=versions/all

## Preview

npx vitepress preview versions/4.0

> Change the '4.0' above to operate another version.