(function () {
	'use strict';
	$("#navbar-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
})();