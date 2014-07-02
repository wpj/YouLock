angular.module('adminPortal.services', [])

.factory('Report', ['$http', function($http) {
  var Report = {
    getAll: function(callback, errCb) {
      $http.get('http://localhost:8080/api/reports').success(function(reports) {
        callback(reports);
      }).error(function(err) {
        errCb(err);
      });
    },
    delete: function(reportId, callback, errCb) {
      $http.delete('http://localhost:8080/api/reports/' + reportId).success(function(data) {
        callback(data);
      }).error(function(err) {
        errCb(err);
      });
    }
  };

  return Report;
}])

.factory('Lockup', ['$http', function($http) {
  var Lockup = {
    findById: function(lockupId, callback, errCb) {
      $http.get('http://localhost:8080/api/lockups/' + lockupId).success(function(data) {
        callback(data);
      }).error(function(err) {
        errCb(err);
      });
    },
    delete: function(lockupId, callback, errCb) {
      $http.delete('http://localhost:8080/api/lockups/' + lockupId).success(function(data) {
        callback(data);
      }).error(function(err) {
        errCb(err);
      });
    }
  };

  return Lockup;
}]);