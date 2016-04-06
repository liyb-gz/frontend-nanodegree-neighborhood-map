'use strict';
var map;

function initMap() {
	var mapDiv = document.getElementById('map');;

	map = new google.maps.Map(mapDiv, {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}