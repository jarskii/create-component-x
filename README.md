create-component-x is a command-line tool that allows you create component structure by blueprint

Installation
--------------

```sh
npm i create-component-x -g
```

Usage
--------------

1. Make blueprint folder with files for the future component, where $compName$ is the future component name part (also you could add $compName$ inside code)

for example structure of blueprint folder:

```sh
blueprint
│   README.md
│   package.json
│
└───src
│   │   $comp$.js
│   │   $comp$.scss
│   │
│   └───block
│       │   $comp$-block.js
│       │   $comp$-block.scss
│       │   ...
│
└───tests
    └───$comp$-test.js

```

for example package.json content

```sh
{
    "name": "$compName&-package",
    "version": "1.0.0",
    "main": "./src/$compName&.js"
}
```
