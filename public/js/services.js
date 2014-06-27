angular.module('services', [])

.factory('Data', ['$http', function($http) {
  var Data = {
    getAll: function(cb, errCb) {
      $http.get('/api/analytics').success(function(records) {
        cb(records);
      }).error(function(err) {
        errCb(err);
      });
    },
    getPageviews: function() {

    },
    getLocations: function() {

    },
    getAddresses: function() {

    }
  };
  return Data;
}]);