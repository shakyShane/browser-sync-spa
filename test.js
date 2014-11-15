var browserSync = require("browser-sync");

browserSync.use(require("./index"));

browserSync({
    server: {
        baseDir: "setups/backbone",
        files:   "setups/angular/*"
    },
    ghostMode: {
        clicks: false
    }
});