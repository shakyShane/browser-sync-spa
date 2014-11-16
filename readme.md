BrowserSync SPA

> Better Single Page App support for BrowserSync

#Install

```shell
$ npm install browser-sync browser-sync-spa
```

#Setup
```js
var browserSync = require("browser-sync");
var spa         = require("browser-sync-spa");

browserSync.use(spa({
    selector: "[ng-app]" // Only needed for angular apps
}));

browserSync({
    open: false,
    server: "setups/angular",
    files:  "setups/angular/*"
});
```

#What you get.

This first release simple addresses two of the most requested features in 
BrowserSync.

* Built-in history API fallback
* State-change syncing for Backbone + Angular apps.

#Moving forward.

I really need some contributors with SPA experience that can help make this plugin awesome.
BrowserSync is already the best solution for live reload + css injecting on SPA's, but 
it's clear we can do better.

Please get involved if you have any experience with HTML5 history api etc.

#Help
Clone this repo and run `npm install && npm test.js` to get an idea of what this plugin will do for you.

#Resources
[BrowserSync](https://github.com/shakyShane/browser-sync)