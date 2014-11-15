var bs = require("browser-sync");
bs.use(require("../index"));

module.exports = function (protractor, config, cb) {
    var flow = protractor.promise.controlFlow();
    var deferred = protractor.promise.defer();
    var instance;
    return flow.execute(function () {
        if (bs.active && instance) {
            instance.cleanup();
        }
        instance = bs(config, function (err, bs) {
            deferred.fulfill(bs);
        });
        return deferred.promise;
    });
};