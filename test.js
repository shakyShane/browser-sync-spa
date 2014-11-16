var browserSync = require("browser-sync");
var spa         = require("./index");

browserSync.use(spa({
    selector: "[ng-app]"
}));

browserSync({
    open: false,
    server: {
        baseDir: "setups/angular"
    },
    files:   "setups/angular/*"
});