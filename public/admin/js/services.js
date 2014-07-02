angular.module('adminPortal.services', [])

.factory('Report', ['$http', 'ServerUrl', function($http, ServerUrl) {
  var Report = {
    getAll: function(callback, errCb) {
      $http.get(ServerUrl + 'api/reports').success(function(reports) {
        callback(reports);
      }).error(function(err) {
        errCb(err);
      });
    },
    delete: function(reportId, callback, errCb) {
      $http.delete(ServerUrl + 'api/reports/' + reportId).success(function(data) {
        callback(data);
      }).error(function(err) {
        errCb(err);
      });
    }
  };

  return Report;
}])

.factory('Lockup', ['$http', 'ServerUrl', function($http, ServerUrl) {
  var Lockup = {
    findById: function(lockupId, callback, errCb) {
      $http.get(ServerUrl + 'api/lockups/' + lockupId).success(function(data) {
        callback(data);
      }).error(function(err) {
        errCb(err);
      });
    },
    delete: function(lockupId, callback, errCb) {
      $http.delete(ServerUrl + 'api/lockups/' + lockupId).success(function(data) {
        callback(data);
      }).error(function(err) {
        errCb(err);
      });
    }
  };

  return Lockup;
}])

.constant('ServerUrl', 'http://localhost:8080/');