# Repo for Cocos Creator User Manual

- Cocos Creator User Manual: [https://docs.cocos.com](https://docs.cocos.com)
- Cocos Engine Official Website：[https://www.cocos.com](https://www.cocos.com/)

## Install Node Modules

```sh
npm install
```

## Generate Sidebar

node ./scripts/create-sidebar.js versions/3.8/zh/SUMMARY.md

node ./scripts/create-sidebar.js versions/3.8/en/SUMMARY.md

## Run In Dev Mode

npx vitepress dev versions/3.8

## Build

node ./scripts/publish.js --version=versions/3.8

## Build All

node ./scripts/publish.js --version=versions/all

## Preview

npx vitepress preview versions/3.8

> Change the '3.8' above to operate another version.
