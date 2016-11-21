'use strict';

angular.module('menuApp')
  .controller('LoginCtrl', function($scope, $location, $rootScope){
    $scope.title = 'Login';
    $scope.LoginIn = function(){
      if($scope.username == 'admin' && $scope.password == 'admin'){
        $rootScope.loggedIn = true;
        $location.path('/dashboard');
      }else{
        $scope.error = 'Tus credenciales no son correctas';
      }
    }
  });
