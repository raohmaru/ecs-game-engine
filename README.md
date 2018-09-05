# Offline Pizza Delivery
A browser game for the JavaScript code competition [Js13kGames](https://js13kgames.com/).

[Play it now!](https://raohmaru.github.io/offline-pizza-delivery/src/)

## Getting Started

### Development

### Available npm commands
`npm run build`  
Generate CSS files and copies HTML and JS files to dist/ folder.

`npm run build:prod`  
Cleans dist/ folder, lints HTML, CSS and JS files, generate CSS files and minifies all files into
dist/ folder.

`npm run lint`  
Lints HTML, CSS and JS files.

`npm run clean`  
Cleans dist/ folder.

`npm run watch`  
Watches for changes in src/ folder and runs the appropriate task when a file is modified.

`npm start`  
Starts a dev server at 127.0.0.1:8080 with path to dist/ folder.

## Browser Support
The game supports Edge, Firefox 34+, Chrome 36+, Safari 9+.
In order to support older browsers, you need polyfills for the following JavaScript features:

- [Performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
- [window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## License
Released under the MIT license.
