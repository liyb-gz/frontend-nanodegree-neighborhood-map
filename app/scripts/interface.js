// JS to support interface features only
(function () {
	'use strict';
	$("#navbar-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
})();