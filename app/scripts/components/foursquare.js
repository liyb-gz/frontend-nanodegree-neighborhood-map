'use strict';

function getFoursquareInfo (id) {
	var foursquareURLPrefix = 'https://api.foursquare.com/v2/venues/';
	var foursquareURLSuffix = '?client_id=MSKSKL5MYNAFMGDCKJOLARZZFV2W4O0A50WJ0HMWFNHQ1YKO&client_secret=4LVCHEYQPLJTEAZ1GTMB3M3UUTIBYUVANJKBQ5IM334OZEV0&v=20130815';
	var foursquareURL = foursquareURLPrefix + id + foursquareURLSuffix;

	var foursquareInfo = {};
	$.getJSON(foursquareURL, function(json) {
		foursquareInfo.name = json.response.venue.name;

		console.log(json);
		return foursquareInfo;
	});
}

// Simulation
// function getFoursquareInfo (id) {
// 	var info;
// 	setTimeout(function () {
// 		info =  {
// 			name: 'Test Location'
// 		};
// 	}, 3000);
// 	console.log('info: ' + info);
// 	return info;
// }