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
    $scope.menu = { name: '', description: '', pricing: null, imageUrl:'food' };
    $scope.menuedit = { name: '', description: '', pricing: null, imageUrl: 'food'};
    $scope.baseurl = 'http://lorempixel.com/400/200';
    //$scope.file = 'pedro.png';

    $scope.clearMenu = function(){
      $scope.menu = { name: '', description: '', pricing: null};
    }

    $scope.addMenu = function(){
      /*
      upload.uploadFile($scope.file, 'name').then(function(res){
        console.log(res);
      })
      */
      ngDexie.put('menu', $scope.menu).then(function(){
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
/*
.directive('uploaderModel', ["$parse", function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs)
    {
      iElement.on("change", function(e)
      {
        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
      });
    }
  };
}])

.service('upload', ["$http", "$q", function ($http, $q)
{
  this.uploadFile = function(file, name)
  {
    var deferred = $q.defer();
    var formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    return $http.post("server.php", formData, {
      headers: {
        "Content-type": undefined
      },
      transformRequest: angular.identity
    })
    .success(function(res)
    {
      deferred.resolve(res);
    })
    .error(function(msg, code)
    {
      deferred.reject(msg);
    })
    return deferred.promise;
  }
}])
*/


