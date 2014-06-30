angular.module('services', [])

.factory('Record', ['$http', function($http) {
  var Record = {
    getAll: function(cb, errCb) {
      $http.get('/api/data').success(function(records) {
        cb(records);
      }).error(function(err) {
        errCb(err);
      });
    },
    findInMapArea: function(SWLng, SWLat, NELng, NELat) {
      return $http.get('http://localhost:8080/api/data', {
        params: {
          filtered: true,
          SWLng: SWLng,
          SWLat: SWLat,
          NELng: NELng,
          NELat: NELat
        }
      });
    },
    getPageviews: function() {

    },
    getLocations: function() {

    },
    getAddresses: function() {

    }
  };
  return Record;
}]);