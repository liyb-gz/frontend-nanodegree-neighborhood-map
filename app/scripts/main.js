/* globals $, google, ko, console*/

(function () {
	'use strict';

	var locations;

	//Initialize the map
	function init() {
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