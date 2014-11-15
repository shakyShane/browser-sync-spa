var async = require("async");
var exec = require("child_process").exec;

var files = [
    "e2e/angular.js",
    "e2e/backbone.js"
];

async.eachSeries(files, function (file, cb) {

    process.env["BS_TEST"] = file;

    exec("protractor test/protractor.config.js", function (err, out) {
        if (err) {
            cb(err);
        }
        console.log(out);
    }).on("close", function (code) {
        if (code !== 0) {
            cb("EXIT with code: " + code);
        }
        cb();
    });

}, function (err) {
    if (err) {
        console.log(err);
    }
});