(function (bs) {

    var sockets = bs.socket;

    (function(history){
        var pushState = history.pushState;
        history.pushState = function(state) {
            var args = Array.prototype.slice.apply(arguments);
            if (typeof history.onpushstate == "function") {
                history.onpushstate({state: state}, args);
            }
            return pushState.apply(history, args);
        }
    })(window.history);

    window.onpopstate = history.onpushstate = function (out, args) {
        sockets.emit("history:change", {path: args[2]});
    }

    sockets.on("history:change", function (data) {

        var pathname = getLocation(data.path).pathname;

        if (window.angular) {
            return syncAngularLocation(pathname);
        }
        if (window.Backbone) {
            return syncBackboneLocation(pathname);
        }

        // Final shot, just update the pushstate
        window.history['pushState']({}, document.title, data.path);
    });

    /**
     * @param pathname
     */
    function syncBackboneLocation (pathname) {
        if (window.Backbone && Backbone.history) {
            Backbone.history.navigate(pathname);
        }
    }

    function syncAngularLocation (pathname) {
        var $injector  = angular.element(document.body).injector();
        var $location  = $injector.get('$location');
        var $rootScope = $injector.get('$rootScope');

        if (pathname !== $location.path()) {
            $location.path(pathname);
            $rootScope.$digest();
        }
    }

    function getLocation (href) {
        var l  = document.createElement("a");
        l.href = href;
        return l;
    };

})(window.___browserSync___);