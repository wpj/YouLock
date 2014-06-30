angular.module('controllers', [])

.controller('PortalCtrl', ['$scope', 'Record', function($scope, Record) {
  // google.maps.visualRefresh = true;

  $scope.map = {
    center: {
      latitude: 40.678528,
      longitude: -73.979316
    },
    control: {},
    zoom: 14,
    options: {
      // minZoom: 14
      // disableDefaultUI: false
    },
    idKey: '_id',
    showBicycling: false,
    showHeat: true,
    showWeather: true,
    heatLayerCallback: function(layer) {
      Record.getAll(function(records) {
        moddedRecords = _.map(records, function(record) {
          return new google.maps.LatLng(record.location.coordinates[1], record.location.coordinates[0]);
        });
        var heatArray = new google.maps.MVCArray(moddedRecords);
        layer.setData(heatArray);
      }, function(err) {
        console.log(err);
      });
    },
    events: {
      idle: function(map, event, eventArgs) {
        searchInMapBounds(map);
      }
    }
  };

  var searchInMapBounds = function(map) {

    var currentMapArea = map.getBounds();

    var northEast = currentMapArea.getNorthEast();
    var southWest = currentMapArea.getSouthWest();
    
    var SWLng = southWest.lng();
    var SWLat = southWest.lat();
    var NELng = northEast.lng();
    var NELat = northEast.lat();

    Record.findInMapArea(SWLng, SWLat, NELng, NELat)
      .success(function(data) {

        $scope.records = data;
        console.log("Number of records sent from server", $scope.records.length);
        console.log("Data sent from server: ", $scope.records);
      })
      .error(function(err, status) {
        console.log(err, status);
      });
  };

}]);