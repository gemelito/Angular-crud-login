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
    $scope.orden = { name: 'pedro', description: 'misael', pricing: 20, imageUrl: 'canceh'  };
    $scope.baseurl = 'http://lorempixel.com/400/200/';
    var listMenu = function(){
      ngDexie.list('menu')
        .then(function(data){
            $scope.items = data;
            //console.log($scope.items);
        });
    };
    //Initial Menu
    listMenu();

  });
