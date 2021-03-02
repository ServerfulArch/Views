
# Serverful/Views

> An extension for selecting cached views.


# Features
* [x] View selection, render and request end.
* [x] A reloadable view cache.
* [x] Automatic header inserts on load.
* [ ] Predefined handler configurations.

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
Register the plugin and configure the view directory.
```js
Serverful.Extension(Views(Content, Headers));
```

Insertion of predefined headers.
```html
// Headers/Navbar.html
<div>
    <a href="#">Home</a>
    <a href="#">Github</a>
<div>

// Views/Index.html
<serverful navbar>
```

Handle a request using by selecting a view.
```js
MyServer.Incoming(Packet => {
    // Information processing...
    Packet.Request.View("/internal/embed");
});
```


This module is licensed under [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0).
