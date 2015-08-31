angular.module('gifvsgif.main', [])


.controller('MainController', function ($scope, $http){

  $scope.softGCount = 0;
  $scope.hardGCount = 0;

  $scope.getCounts = function(){
    return $http({
      method : 'GET',
      url : '/getCounts',
    }).then(function (voteCounts){

      if (voteCounts.data[0].id === 2) {
        $scope.softGCount = voteCounts.data[0].votes;
        $scope.hardGCount = voteCounts.data[1].votes;

      } else if (voteCounts.data[0].id === 1) {
        $scope.hardGCount = voteCounts.data[0].votes;
        $scope.softGCount = voteCounts.data[1].votes;
      }
    })
  }

  $scope.voteSoft = function(){
    //send post request to server
    return $http({
      method : 'POST',
      url: '/voteSoft',
    }).then(function(err, results) {
      if (err) {
        alert("Sorry, you've already voted.");
      }
      return $scope.getCounts();
    })
  };

  $scope.voteHard = function(){

    return $http({
      method : 'POST',
      url: '/voteHard',
    }).then(function(err, results){
      if (err) {
        alert("Sorry, you've already voted.");
      }
      return $scope.getCounts();
    })
  };

  $scope.getCounts();

})
