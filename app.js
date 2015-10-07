var daysUntilChristmas = (function () {
	'use strict';

	var DateHelper = require('./lib/dateHelper.js'),
		birthday = {
    		month: "décembre",
    		day: 25,
		};

	var dateHelper = new DateHelper('fr');
	return dateHelper.daysUntilNext(birthday);
})();

console.log(daysUntilChristmas);