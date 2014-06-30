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
    findDataTypeInMapArea: function(SWLng, SWLat, NELng, NELat, searchMode) {
      return $http.get('http://localhost:8080/api/data', {
        params: {
          searchMode: searchMode,
          filtered: true,
          SWLng: SWLng,
          SWLat: SWLat,
          NELng: NELng,
          NELat: NELat
        }
      });
    },
    findAllInMapArea: function(SWLng, SWLat, NELng, NELat) {
      console.log("searching on the server!");
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