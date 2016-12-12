'use strict';

angular.module('menuApp')
  .controller('MainCtrl', function ($scope, ngDexie) {
    $scope.items = [];
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
      ngDexie.getDb(function(db){
        db.table('pedido').put(item).then(function(){
          $("#snackbar-orden").snackbar("show");
          listMenu();
        })
      });
    }

  });
