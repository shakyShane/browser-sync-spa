var init = require("../bs.init.js");
var path = require("path");
var assert = require("chai").assert;

describe('Backbone setup', function() {
    var ptor     = protractor.getInstance();
    var instance;
    var urls;
    beforeEach(function () {
        browser.ignoreSynchronization = true;
        var config = {
            server: "setups/backbone",
            open: false,
            logLevel: "silent",
            online: false
        };
        init(protractor, config).then(function (bs) {
            instance = bs;
            urls = instance.getOption("urls");
        });
    });
    it("should reload ok", function () {

        browser.get(urls.local);
        assertScripts();
        ptor.executeScript("window.open('%s')".replace("%s", urls.local));
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[0]).then(function () {
                element.all(by.tagName("a")).then(function (elems) {
                    elems[0].click();
                    browser.switchTo().window(handles[1]).then(function () {
                        expect(ptor.getCurrentUrl()).toContain("page1");
                    });
                });
            });
        });
    });
});

function assertScripts () {
    expect(element(by.id('__bs_script__')).isPresent()).toBeTruthy();
    expect(element(by.id('__bs_notify__')).isPresent()).toBeTruthy();
}