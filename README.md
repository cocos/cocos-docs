# Cocos Creator User Manual

## Requirements

This documentation site is powered by [GitBook](https://www.gitbook.com/). You can check out the online version [here](http://docs.cocos.com/creator/manual).

You need [Node.js](https://nodejs.org/en/) and npm to be able to build the site.

To install gitbook:

```bash
npm install gitbook-cli -g
```

Install gitbook plugins:

```bash
gitbook install
```

## Preview and Build

To preview the doc, run the following command:

```bash
gitbook serve
```

This will build and launch web server to host the site. It will also enable livereload plugin so your changes to the markdown source file will automatically triggers rebuild of the docs.

If you just want to build the markdown to html, use this command:

```bash
gitbook build
```

You can also build the doc for ebook formats (PDF, ePub, mobi), please following this guide:

https://toolchain.gitbook.com/ebook.html

## Content Editing

The markdown source of this book is in language specific folders [/en](en) and [/zh](zh). Language options are registered in [LANGS.md](LANGS.md) file.

### Index

In each language folder there is an [SUMMARY.md](en/SUMMARY.md) file, which contains all the pages to build and also this file serves as a sidebar navigation list. Any markdown source file that are not listed in this index will not be build.

In this index file, just write links to each markdown file in a list. Indented list is for chapters that contains expandable subs. For example:

```md
- [Using Editor](getting-started/basics/editor-overview.md)
	- [Assets](getting-started/basics/editor-panels/assets.md)
	- [Scene](getting-started/basics/editor-panels/scene.md)
	- [Node Tree](getting-started/basics/editor-panels/node-tree.md)
```

Will create a toggleable chapter title `Using Editor`. Once clicked all its subs will show up.

### Front page

[index.md](en/index.md) at each language folder is the front page of the doc.

### Page content

To change the content of each page, just edit the markdown source files. There's no specific front matter format, just make sure each page has a `h1` as the title.

## Contribution

If you encounters any typo or content problem please report issue in this repo. Pull requests are welcome!