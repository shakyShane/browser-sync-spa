var browserSync = require("browser-sync");
var request     = require("supertest");
var assert      = require("chai").assert;

describe("registering plugin with bs", function () {

    var instance;
    before(function (done) {
        browserSync.use(require("../../index")());
        instance = browserSync({
            server: "setups/angular",
            online: false,
            open: false
        }, function (err, bs) {
            done();
        });
    });
    after(function () {
        instance.cleanup();
    });
    it("should integrate", function () {
        assert.equal(instance.getUserPlugins()[0].name, "BrowserSync SPA");
    });
    it("should serve index.html when route not matched", function (done) {
        request(instance.server)
            .get("/someroute")
            .set("accept", "text/html")
            .expect(200)
            .end(function (err, res) {
                assert.include(res.text, instance.options.snippet);
                assert.include(res.text, "MainController");
                done();
            });
    });
});
