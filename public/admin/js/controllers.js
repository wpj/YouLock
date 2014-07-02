angular.module('adminPortal.controllers', [])

.controller('AdminCtrl', ['$scope', 'Report', 'Lockup', function($scope, Report, Lockup) {

  $scope.getReports = function() {
    Report.getAll(function(reports) {
      $scope.reports = reports;
    }, function(err) {
      console.log(err);
    });
  };

  $scope.deleteReport = function(index) {
    Report.delete($scope.reports[index]._id, function(data) {
      $scope.reports.splice(index, 1);
      console.log(data);
    }, function(err) {
      console.log(err);
    });
  };

  $scope.deleteLockup = function(index) {
    Lockup.delete($scope.reports[index].lockupId, function(data) {
      console.log(data);
    }, function(err) {
      console.log(err);
    });
  };

  var getLockupInfo = function(index) {
    // console.log($scope.reports[index]);
    Lockup.findById($scope.reports[index].lockupId, function(lockup) {
      $scope.activePaneInfo = lockup;
    }, function(err) {
      console.log(err);
    });
  };

  $scope.showInfo = function(index) {
    return $scope.activePane === index;
  };

  $scope.toggleLockupInfo = function(index) {
    $scope.activePane = index;

    getLockupInfo(index);
  };

  $scope.printJunk = function(index) {
    return index;
  };

}]);