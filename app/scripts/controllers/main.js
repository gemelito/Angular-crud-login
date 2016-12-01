'use strict';

angular.module('menuApp')
  .controller('MainCtrl', function ($scope, ngDexie) {
    $scope.items = [];
    $scope.orden = { name: '', description: '', pricing: null, imageUrl: ''  };
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

    $scope.addOrden = function(item){
      $scope.orden.name = item.name;
      $scope.orden.description = item.description;
      $scope.orden.pricing = item.pricing;
      $scope.orden.imageUrl = item.imageUrl;
      ngDexie.getDb(function(db){
        db.table('pedido').add($scope.orden).then(function(){
          $("#snackbar-orden").snackbar("show");
        })
      });
    }

  });
