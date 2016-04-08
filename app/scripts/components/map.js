/* globals google, console*/
'use strict';
var map;

function Map () {
	var self = this;

	// Variables
	self.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 0, lng: 0},
		zoom: 12 //Default: 12
	});

	self.markers = [];
	self.infoWindows = [];

	// Methods
	self.addMarker = function (locViewModel) {
		var redMarker = 'http://maps.google.com/mapfiles/ms/icons/red.png';

		var newMarker = new google.maps.Marker({
			position: locViewModel.coordinates,
			map: self.map,
			title: locViewModel.name,
			icon: redMarker
		});

		newMarker.animationTimeout = null;

		// Add useful operations to the marker here.
		newMarker.drop = function () {
			this.setAnimation(google.maps.Animation.DROP);
		};

		newMarker.bounce = function (callback) {
			this.setAnimation(google.maps.Animation.BOUNCE);
			this.animationTimeout = setTimeout(function (marker) {
				marker.setAnimation(null);
				callback();
			}, 1400, this); // Marker bouncing: 700ms per circle
		};

		newMarker.resetAnimation = function () {
			this.setAnimation(null);
		};

		newMarker.setActive = function () {
			this.setIcon(null);
		};

		newMarker.resetActive = function () {
			this.setIcon(redMarker);
		};

		self.markers.push(newMarker);
		return newMarker;
	};

	self.resetMarkers = function () {
		self.markers.forEach(function (marker) {
			marker.resetAnimation();
			marker.resetActive();
			clearTimeout(marker.animationTimeout);
		});
	};

	self.addInfoWindow = function (locViewModel) {
		var newInfoWindow = new google.maps.InfoWindow({
			content: '<div class="row"><div class="col-md-12"><div class="panel panel-default" id="loc"><div class="panel-heading">Testing Park 1</div><div class="panel-body"><div class="basic-info"><span class="cat">Park</span>,<span class="addr">Addr</span><br><span class="region">Sai Kung</span></div><img class="photo img-responsive" src="http://lorempixel.com/300/300/"></div></div></div></div>' + '<br> testing ' + locViewModel.name
		});

		newInfoWindow.setActive = function () {
			this.open(self.map, locViewModel.marker);
		};

		self.infoWindows.push(newInfoWindow);
		return newInfoWindow;
	};

	self.resetInfoWindows = function () {
		self.infoWindows.forEach(function (infoWindows) {
			infoWindows.close();
		});
	};

	self.panTo = function (location) {
		self.map.panTo(location.coordinates);
	};

	// Execute

	// Testing
}