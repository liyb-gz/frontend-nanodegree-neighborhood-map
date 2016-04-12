/* globals $ */

// JS to support interface features only
(function () {
	'use strict';

	$('#navbar-toggle').click(function(e) {
        e.preventDefault();
    });

    $('#filter-form').submit(function(e) {
        e.preventDefault();
    });
})();
