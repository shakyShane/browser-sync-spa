var module      = angular.module("BrowserSync", ["ngRoute"]);

/**
 * Route Configuration
 */
module.config(["$routeProvider", "$locationProvider", Config]);
module.controller("MainController", function ($rootScope) {
    $rootScope.$on("$routeChangeSuccess", function (out) {
        console.log(out);
    });
});
module.controller("PageController", [PageController]);

function PageController () {
    console.log("hey yo");
}

/**
 * @param $routeProvider
 * @constructor
 */
function Config ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/page1', {
            templateUrl: 'page1.html',
            controller: 'PageController'
        })
        .when('/page2', {
            templateUrl: 'page2.html',
            controller: 'PageController'
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}