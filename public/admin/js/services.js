angular.module('adminPortal.services', [])

.factory('Report', ['$http', 'ServerUrl', function($http, ServerUrl) {
  var Report = {
    getAll: function(callback, errCb) {
      $http.get(ServerUrl + 'admin/reports').success(function(reports) {
        callback(reports);
      }).error(function(err) {
        errCb(err);
      });
    },
    delete: function(reportId, callback, errCb) {
      $http.delete(ServerUrl + 'admin/reports/' + reportId).success(function(data) {
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
      $http.delete(ServerUrl + 'admin/lockups/' + lockupId).success(function(data) {
        callback(data);
      }).error(function(err) {
        errCb(err);
      });
    }
  };

  return Lockup;
}])

.factory('Admin', ['$http', 'ServerUrl', function($http, ServerUrl) {
  var Admin = {
    logout: function() {
      $http.get(ServerUrl + 'admin/logout').success(function(data) {
        console.log(data);
      }).error(function(err) {
        console.log(err);
      });
    }
  };
  return Admin;
}])

.constant('ServerUrl', '/');