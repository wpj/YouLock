angular.module('services', [])

.factory('Record', ['$http', 'ServerUrl', function($http, ServerUrl) {
  var Record = {
    getAll: function(cb, errCb) {
      $http.get('/api/data').success(function(records) {
        cb(records);
      }).error(function(err) {
        errCb(err);
      });
    },
    findDataTypeInMapArea: function(SWLng, SWLat, NELng, NELat, searchMode) {
      return $http.get(ServerUrl + 'api/data', {
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
      return $http.get(ServerUrl + 'api/data', {
        params: {
          filtered: true,
          SWLng: SWLng,
          SWLat: SWLat,
          NELng: NELng,
          NELat: NELat
        }
      });
    }
  };
  return Record;
}])

.factory('Location', ['$q', function($q) {
  var Location = {
    geocode: function(address) {
      var geocoder = new google.maps.Geocoder();
      var deferred = $q.defer();
      geocoder.geocode({ address: address }, function(results, status) {
        if (status === "OK") {
          return deferred.resolve(results);
        } else {
          return deferred.reject();
        }
      });
      return deferred.promise;
    }
  };
  return Location;
}])

.constant('ServerUrl', '/');
// .constant('ServerUrl', 'http://localhost:8080/');