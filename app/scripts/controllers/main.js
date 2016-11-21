'use strict';

/**
 * @ngdoc function
 * @name menuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the menuApp
 */
angular.module('menuApp')
  .controller('MainCtrl', function ($scope, ngDexie) {
    $scope.items = [];
    var listMenu = function(){
      ngDexie.list('menu')
        .then(function(data){
            $scope.items = data;
            console.log($scope.items);
        });
    };
    //Initial refresh
    listMenu();

  });
