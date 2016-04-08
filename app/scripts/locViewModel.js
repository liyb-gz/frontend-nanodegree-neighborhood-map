/* globals console, ko, map */
'use strict';

// @param location - Object
// @param list - ListViewModel that contains this LocViewModel
function LocViewModel (location, list) {
	var self = this;

	// These variables don't change, so no need to use observables.
	self.name = location.name;
	self.coordinates = location.coordinates;
	self.foursquareID = location.foursquareID;
	self.list = list;

	// Observables
	self.foursquareInfo = ko.observable(); // Foursquare Information

	self.isActive = ko.computed(function () {
		return this === this.list.currentLocation();
	}, self);

	// Google Map Marker
	self.marker = map.addMarker(self);
	self.marker.addListener('click', function () {
		self.setActive();
	});

	// Google Map InfoWindow
	self.infoWindow = map.addInfoWindow(self);

	// Testing
	self.testing = ko.computed(function () {
		return new Date() + self.isActive() + self.name;
	}, self);

	// Methods
	self.setActive = function () {
		// List
		self.list.setCurrentLocation(self);

		// Map
		map.panTo(self);

		// Resets
		map.resetMarkers(); //Stop other animations and reset colors
		map.resetInfoWindows();

		// Marker and InfoWindow
		self.marker.setActive();
		self.marker.bounce(function () {
			self.infoWindow.setActive();
		}); //Set this marker to animate
	};

	// Encapsulate the getJSON request
	self.updateFoursquareInfo = function () {
		var foursquareURLPrefix = 'https://api.foursquare.com/v2/venues/';
		var foursquareURLSuffix = '?client_id=MSKSKL5MYNAFMGDCKJOLARZZFV2W4O0A50WJ0HMWFNHQ1YKO&client_secret=4LVCHEYQPLJTEAZ1GTMB3M3UUTIBYUVANJKBQ5IM334OZEV0&v=20130815';
		var foursquareURL = foursquareURLPrefix + self.foursquareID + foursquareURLSuffix;

		return $.getJSON(foursquareURL, function (json) {
			var info = {
				name: json.response.venue.name ? json.response.venue.name : 'Unnamed',
				categories: json.response.venue.categories ? json.response.venue.categories : ['No categories'],
				address: json.response.venue.location.address ? json.response.venue.location.address : 'No address information',
				rating: json.response.venue.rating ? json.response.venue.rating : '?',
				ratingSignals: json.response.venue.ratingSignals ? json.response.venue.ratingSignals : 'unknown',
				image: json.response.venue.bestPhoto ?
					json.response.venue.bestPhoto.prefix +
					'500x500' +
					json.response.venue.bestPhoto.suffix : null,
				comment: json.response.venue.tips.groups ?
					{ //May need data check later
						text: json.response.venue.tips.groups[0].items[0].text,
						author: json.response.venue.tips.groups[0].items[0].user.firstName + ' ' +
						json.response.venue.tips.groups[0].items[0].user.lastName
					} : {
						text: 'No comments yet.',
						author: null
					}
			};
			self.foursquareInfo(info);
			self.infoWindow.updateContent($('#infoWindowTemplate').prop('innerHTML'));
			console.log(self.infoWindow);
		});
	};

	// Execute
	self.updateFoursquareInfo();
}