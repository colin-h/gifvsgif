angular.module('gifvsgif.main', [])


.controller('MainController', function ($scope, $http){

  $scope.softGCount = 0;
  $scope.hardGCount = 0;
  $scope.hasVoted;

  $scope.voteSoft = function(){
    //send post request to server
    return $http({
      method : 'POST',
      url: '/voteSoft',
    })

  };

  $scope.voteHard = function(){

    return $http({
      method : 'POST',
      url: '/voteHard',
    })
  };


})
