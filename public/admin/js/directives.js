angular.module('adminPortal.directives', [])

.directive('gpAutocomplete', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function($scope, element) {
      var autocomplete = new google.maps.places.Autocomplete(element[0]);
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
          // map.panTo(place.geometry.location);
          $scope.map.center = place.geometry.location;
          $scope.map.zoom = 15;
        }
      });
    }
  };
});