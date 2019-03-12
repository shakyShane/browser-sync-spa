var historyApiFallback = require("connect-history-api-fallback");

const PLUGIN_NAME          = "BrowserSync SPA";
const HISTORY_CHANGE_EVENT = "history:change";
const CLIENT_JS            = "/client.js";

/**
 * Plugin interface for BrowserSync
 */
var plugin = {
    "plugin:name": PLUGIN_NAME,
    "plugin": function (opts, instance) {
        var logger = instance.getLogger(PLUGIN_NAME);
        logger.info("Running...");
    },
    "hooks": {
        "client:js": "",
        "client:events": function () {
            return HISTORY_CHANGE_EVENT;
        }
    }
}

const defaults = {
    selector: "[ng-app]",
    history: {}
};

/**
 * Allow run-time modifications to the client-side script
 * @param opts
 */
module.exports = function (opts) {
    var config   = Object.assign({}, defaults, opts);
    var clientJs = require("fs").readFileSync(__dirname + CLIENT_JS, "utf-8");
    plugin.hooks["client:js"] = clientJs.replace("%SELECTOR%", config.selector);

    if (config.history) {
        plugin.hooks["server:middleware"] = function () {
            return historyApiFallback(config.history);
        };
    }


    return plugin;
}