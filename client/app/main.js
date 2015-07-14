angular.module('gifvsgif.main', [])


.controller('MainController', function ($scope, $http){

  $scope.softGCount = 0;
  $scope.hardGCount = 0;

  $scope.voteHard = function(){
    return $http({
      method : 'GET',
      url: '/auth/github',
    });

    $scope.softGCount++;
  };

  $scope.voteSoft = function(){
    $scope.hardGCount++;
  };

})
