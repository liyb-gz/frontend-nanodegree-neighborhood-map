/* globals console, ko, map, $ */
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
	self.foursquareInfoString = ko.computed(function () {
	//Info Window content string based on self.foursquareInfo
		if (this.foursquareInfo() === undefined) {
			return 'Sorry, Information about this location cannot be retrieved.';
		} else {
			// I tried, but I cannot figure out how to bind data to the info window.
			// So here is the non-knockout way to inject the content into the info window.
			var info = self.foursquareInfo();
			var content = '<h3>' + info.name + '<br>';
			content += '<small>';
			info.categories.forEach(function (category) {
				content += '<span class="label label-info">' + category.name + '</span> ';
			});
			content += '</small>';
			content += '</h3>';
			content += '<address>' + info.address + '</address>';
			content += '<div class="well">';
			content += '<span class="rating label label-primary">' + info.rating + ' / ';
			content += '<span class="total">10</span>';
			content += '</span> ';
			content += ' Based on ' + info.ratingSignals + ' votes';
			content += '</div>';
			content += '<img class="img-responsive" src="' + info.image + '" alt="' + info.name + '">';
			content += '<br>';
			content += '<blockquote>';
			content += '<p>' + info.comment.text + '</p>';
			content += '<footer>' + info.comment.author + '</footer>';
			content += '</blockquote>';
			content += '<p class="text-muted">Information provided by <a target="_blank" href="https://foursquare.com/v/' + this.foursquareID + '">Foursquare.com</a></p>';
			return content;
		}
	}, self);

	self.isActive = ko.computed(function () {
		return this === this.list.currentLocation();
	}, self);

	self.isOnList = ko.computed(function () {
		return self.list.filteredLocations().indexOf(self) > -1;
	});

	// self.isActive.subscribe(function (active) {
	// 	if (active) {

	// 	} else {
	// 		marker.resetAnimation();
	// 		marker.resetActive();
	// 		clearTimeout(marker.animationTimeout);
	// 	}
	// });

	// Listener to the isOnList observable
	self.isOnList.subscribe(function (onList) {
		// Marker
		self.marker.setVisible(onList);

		// If not on the list, reset the active state
		if (!onList) {
			self.resetActive();
		}
	});

	// Google Map Marker
	self.marker = map.addMarker(self);
	self.marker.addListener('click', function () {
		self.setActive();
	});

	// Google Map InfoWindow
	self.infoWindow = map.addInfoWindow(self);

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
			// Do the following after bouncing
			self.infoWindow.setActive();
		}); //Set this marker to animate
	};

	self.resetActive = function () {
		self.list.setCurrentLocation(undefined);
		map.resetMarkers();
		map.resetInfoWindows();
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
						author: json.response.venue.tips.groups[0].items[0].user.firstName ? json.response.venue.tips.groups[0].items[0].user.firstName : 'null' + ' ' +
						json.response.venue.tips.groups[0].items[0].user.lastName ? json.response.venue.tips.groups[0].items[0].user.lastName : null
					} : {
						text: 'No comments yet.',
						author: null
					}
			};
			self.foursquareInfo(info);
		})
		.always(function () {
			self.infoWindow.updateContent(self.foursquareInfoString());
		});
	};

	// Execute
	self.updateFoursquareInfo();
}