angular.module('adminPortal.controllers', [])

.controller('AdminCtrl', ['$scope', 'Report', 'Lockup', 'Admin', function($scope, Report, Lockup, Admin) {

  $scope.getReports = function() {
    Report.getAll(function(reports) {
      $scope.reports = reports;
    }, function(err) {
      console.log(err);
    });
  };

  $scope.deleteReport = function(report) {
    Report.delete(report._id, function(data) {
      $scope.reports.splice($scope.reports.indexOf(report), 1);
      console.log(data);
    }, function(err) {
      console.log(err);
    });
  };

  $scope.deleteLockup = function(report) {
    Lockup.delete(report.lockupId, function(data) {
      console.log(data);
    }, function(err) {
      console.log(err);
    });
  };

  var getLockupInfo = function(report) {
    Lockup.findById(report.lockupId, function(lockup) {
      $scope.activeReportInfo = lockup;
    }, function(err) {
      console.log(err);
    });
  };

  $scope.showInfo = function(report) {
    return $scope.activeReport === $scope.reports.indexOf(report);
  };

  $scope.toggleLockupInfo = function(report) {
    $scope.activeReport = $scope.reports.indexOf(report);

    getLockupInfo(report);
  };

  $scope.logout = function() {
    Admin.logout();
  };

}]);