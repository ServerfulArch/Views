
# Serverful/Views

> An extension for selecting cached views.


# Features
* [ ] View selection, render and request end.
* [ ] A reloadable view cache.
* [ ] Automatic header inserts on load.

## Links
* [Documentations](https://github.com/ServerfulArch/Views/blob/master/Documentation/Index.md)
* [Github](https://github.com/Serverful/Views)

## Installation
`npm install @serverful/views`
```js
const Views = require("@serverful/views");
// ...
```


# Usage
Register the plugin and configure views.
```js
Serverful.Extension(Views("./WebContent/Views/"));
```


This module is licensed under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0).
