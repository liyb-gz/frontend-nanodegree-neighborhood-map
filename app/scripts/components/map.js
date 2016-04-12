/* globals google*/
/* exported map, Map */

var map;

// This is a wrapper of the components (marker, infowindow) on the map.
// The Google map itself should be map.map
function Map () {
	'use strict';
	var self = this;

	// Variables
	self.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 0, lng: 0},
		zoom: 12 //Default: 12
	});

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

		// Methods of a marker
		newMarker.drop = function () {
			this.setAnimation(google.maps.Animation.DROP);
		};

		newMarker.bounce = function (callback) {
			this.setAnimation(google.maps.Animation.BOUNCE);
			this.animationTimeout = setTimeout(function (marker) {
				marker.setAnimation(null);
				callback();
			}, 700 * 2, this); // Marker bouncing: 700ms per circle
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

		return newMarker;
	};

	self.addInfoWindow = function (locViewModel) {
		var newInfoWindow = new google.maps.InfoWindow({
			/* A previous reviewer mentioned here:
			 *
			 * This doesn't seem to work as expected.
			 * There's a noticeable delay before infowindow is opened.
			 * This loading message also doesn't show up.
			 *
			 * But this is exactly what I expected.
			 * This loading message is not supposed to show up,
			 * unless it takes so much time for the Foursquare API to load,
			 * that the content is not yet replaced by the real content (in locViewModel.js),
			 * or the "fail to load" message
			 *
			 * Try "GPRS" throttling in Chrome DevTool and click a marker once it appear,
			 * And you will see this loading message.
			 */
			content: 'Loading information...'
		});

		newInfoWindow.setActive = function () {
			this.open(self.map, locViewModel.marker);
		};

		newInfoWindow.updateContent = function (data) {
			this.setContent(data);
		};

		return newInfoWindow;
	};

	self.panTo = function (location) {
		self.map.panTo(location.coordinates);
	};
}
