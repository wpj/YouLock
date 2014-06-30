angular.module('controllers', [])

.controller('PortalCtrl', ['$scope', 'Data', function($scope, Data) {
  $scope.map = {
    center: {
      latitude: 40.678528,
      longitude: -73.979316
    },
    // control: {},
    zoom: 16,
    options: {
      // minZoom: 14
      // disableDefaultUI: false
    },
    idKey: '_id',
    showBicycling: true,
    showHeat: true,
    showWeather: true,
    heatLayerCallback: function(layer) {
      var mockHeatLayer = new MockHeatLayer(layer);
      console.log("Heat layer created.");
    }
    // events: {
    //   idle: function(map, event, eventArgs) {
    //     searchInMapBounds(map);
    //   }
    // },
  };
  $scope.getRecords = function() {
    Data.getAll(function(records) {
      $scope.records = records;
      console.log($scope.records);
    }, function(err) {
      console.log(err);
    });
  };
}]);