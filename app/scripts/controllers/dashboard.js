'use strict';

angular.module('menuApp')
  //My filter
  .filter('cortarTexto', function(){
    return function(input, limit){
      return (input.length > limit) ? input.substr(0, limit)+'...' : input;
    };
  })

  .controller('DashboardCtrl', function($scope, ngDexie){
    $scope.title = 'Dashboard';
    $scope.items = [];
    $scope.setInterval = 5000;
    $scope.menu = { name: '', description: '', pricing: null, imageUrl: '' };
    $scope.menuedit = { name: '', description: '', pricing: null, imageUrl: ''};

    $scope.clearMenu = function(){
      $scope.menu = { name: '', description: '', pricing: null, imageUrl: '' };
    }

    $scope.addMenu = function(){
      ngDexie.put('menu', $scope.menu).then(function(){
        console.log('Se guardo el platillo');
        $scope.clearMenu();
        $('#addMenu').modal('hide');
        $scope.getAll();
        $("#snackbar-success").snackbar("show");
      });
    }

    $scope.EliminarItem = function(id){
      ngDexie.getDb(function(db){
        db.table('menu').delete(id).then(function(){
          $scope.getAll();
          $("#snackbar-delete").snackbar("show");
        })
      });
    }

    $scope.EditarItem = function(id){
      ngDexie.get('menu', id).then(function(data){
        $scope.menuedit = data;
      });
    }
    //id para eliminar el item que nos pasaron
    $scope.UpdateItem = function(id){
      ngDexie.put('menu', $scope.menuedit).then(function(){
        console.log('Se actualizado el platillo');
        $scope.clearMenu();
        $('#menuUpDate').modal('hide');
        $scope.getAll();
        $("#snackbar-update").snackbar("show");
      });
    }

    $scope.getAll = function(){
      ngDexie.list('menu')
        .then(function(data){
            $scope.items = data;
        });
    }
    //Initial getAll
    $scope.getAll();


  });
