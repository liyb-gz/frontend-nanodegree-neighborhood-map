'use strict';
var map;
var markers = [];

function initMap() {
	var mapDiv = document.getElementById('map');

	map = new google.maps.Map(mapDiv, {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});

	markers.push(new google.maps.Marker({
		position: {
			lat: 22.332040,
			lng: 114.190232
		},
		map: map,
		title: 'hello!'
	}));

	markers.push(new google.maps.Marker({
		position: {
			lat: 22.352040,
			lng: 114.190232
		},
		map: map,
		title: 'hello!'
	}));
}