angular.module('controllers', [])

.controller('PortalCtrl', ['$scope', 'Record', 'Location', function($scope, Record, Location) {
  // google.maps.visualRefresh = true;

  $scope.searchMode = 1;

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
    heatLayerCallback: function(layer) {
      $scope.heatLayer = layer;
    },
    events: {
      idle: function(map, event, eventArgs) {
        setHeat();
      }
    }
  };

  $scope.searchText = '';

  var setHeat = function() {
    searchInMapBoundsWithCallback($scope.map.control.getGMap(), function(records) {
      scopeRecords = records;
      console.log("Number of records sent from server", scopeRecords.length);
      console.log("Data sent from server: ", scopeRecords);

      moddedRecords = _.map(records, function(record) {
        return new google.maps.LatLng(record.location.coordinates[1], record.location.coordinates[0]);
      });
      var heat = new google.maps.MVCArray(moddedRecords);
      $scope.heatLayer.setData(heat);
      console.log("Heat layer: ", $scope.heatLayer);
      console.log("Heat layer data length: ", $scope.heatLayer.data.length);
    });
  };

  var searchInMapBoundsWithCallback = function(map, callback) {

    var currentMapArea = map.getBounds();

    var northEast = currentMapArea.getNorthEast();
    var southWest = currentMapArea.getSouthWest();
    
    var SWLng = southWest.lng();
    var SWLat = southWest.lat();
    var NELng = northEast.lng();
    var NELat = northEast.lat();

    Record.findDataTypeInMapArea(SWLng, SWLat, NELng, NELat, $scope.searchMode)
      .success(function(data) {
        callback(data);
      })
      .error(function(err, status) {
        console.log(err, status);
      });
  };

  $scope.activeButton = 1;

  $scope.active = function() {
    return $scope.searchMode;
  };

  $scope.setPageviewMode = function() {
    $scope.searchMode = 1;
    $scope.activeButton = 1;
    setHeat();
  };

  $scope.setGPSMode = function() {
    $scope.searchMode = 2;
    $scope.activeButton = 2;
    setHeat();
  };

  $scope.setAddressMode = function() {
    $scope.searchMode = 3;
    $scope.activeButton = 3;
    setHeat();
  };


  $scope.searchLocation = function() {
    // console.log($scope.searchText);
    // $scope.map.center = {latitude: 32.779680, longitude: -79.935493};

    Location.geocode($scope.searchText).then(function(data) {
      $scope.map.center = { latitude: data[0].geometry.location.d, longitude: data[0].geometry.location.e };
    }, function(err) {
      console.log("Not found!");
    });
  };

  $scope.searchIsActive = function() {
    return $scope.searchText.length;
  };

}]);