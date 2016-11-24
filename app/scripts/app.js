'use strict';

/**
 * @ngdoc overview
 * @name menuApp
 * @description
 * # menuApp
 *
 * Main module of the application.
 */
angular
  .module('menuApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngdexie',
    'ngdexie.ui'
  ])
  .config(function(ngDexieProvider){
    ngDexieProvider.setOptions({name: 'MenuApp', debug: false})
    ngDexieProvider.setConfiguration(function (db) {
      db.version(1).stores({
          menu: "++id,name,description,pricing,imageUrl",
      })
      db.on('error', function (err) {
          // Catch all uncatched DB-related errors and exceptions
          console.error("db error err=" + err)
      })
    })
  })

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })

      .when('/dashboard', {
        resolve: {
          "check": function($location, $rootScope){
            if (!$rootScope.loggedIn) {
              $location.path('/');
            }
          }
        },
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })

      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })

      .when('/logout',{
       resolve: {
          "check": function($location, $rootScope){
              $rootScope.loggedIn = false;
              $location.path('/');
          }
        }
      })

      .otherwise({
        redirectTo: '/'
      });
  });
