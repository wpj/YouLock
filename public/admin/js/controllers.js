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

}]);