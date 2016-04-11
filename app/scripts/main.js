/* globals $, ko, map, Map, ListViewModel*/

(function () {
	'use strict';

	var locations;

	//Initialize the map
	function init() {
		// The var map is defined as a global variable
		// Note that this is a wrapper of the google map,
		// Adding methods for operation on markers and info windows
		// The google map itself is map.map
		map = new Map();
		var listViewModel = new ListViewModel(locations);
		ko.applyBindings(listViewModel);
	}

	// Codes that inits the app
	$.when(

		//Load JSON that stores locations
		$.getJSON('scripts/models/locations.json', function(json) {
			locations = json.locations;
		}),

		//Load Google map
		//key=AIzaSyCOvT4WRm8Y1FRgoZZaKo-7M71f1AbNEvI
		$.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCOvT4WRm8Y1FRgoZZaKo-7M71f1AbNEvI')

	).then(function () {
		//Init the app when both locations and map are ready
		init();
	});

})();