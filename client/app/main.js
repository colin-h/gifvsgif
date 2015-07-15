angular.module('gifvsgif.main', [])


.controller('MainController', function ($scope, $http){

  $scope.softGCount = 0;
  $scope.hardGCount = 0;

  $scope.getCounts = function(){
    return $http({
      method : 'GET',
      url : '/getCounts',
    }).then(function (voteCounts){
      console.log(voteCounts.data);
      console.log("voteCounts are above ^^^")
      // $scope.hardGCount = voteCounts.data[0].votes;
      // $scope.softGCount = voteCounts.data[1].votes;

      if (voteCounts.data[0].gif_type = 'hard-g'){
        $scope.hardGCount = voteCounts.data[0].votes;
        $scope.softGCount = voteCounts.data[0].votes;

      } else {
        $scope.hardGCount = voteCounts.data[1].votes;
        $scope.softGCount = voteCounts.data[0].votes;
      }
    })
  }

  $scope.voteSoft = function(){
    //send post request to server
    return $http({
      method : 'POST',
      url: '/voteSoft',
    }).then(function() {
      return $scope.getCounts();
    })


  };

  $scope.voteHard = function(){

    return $http({
      method : 'POST',
      url: '/voteHard',
    }).then(function(){

      return $scope.getCounts();
    })

  };

  $scope.getCounts();

})
