var _ = require('underscore');
var data = require('./data'); // loads the data.json file in the same directory

/**
* @class dateHelper
* @param {String} [locale="en"] - an optional locale parameter as a string (i.e. "en", "fr", ... defaults to English "en")
*/

function dateHelper (locale) {
    var month = null,
        duration = null;

    /**
    * @method empty
    * @description checks if the argument is empty i.e. undefined, null, an empty array or an emtpy string (an array or a string with length = 0)
    * @param {*} arg - an argument of any type
    * @returns {Boolean} true if the argument is considered empty, false otherwise
    */

    this.empty = function (arg) {
        return typeof arg === 'undefined' ||
               (typeof arg === 'object' && arg === null) ||
               (arg instanceof Array && arg.length === 0) ||
               (typeof arg === 'string' && arg.length === 0) ||
               false;
    };

    /**
    * @method isLeapYear
    * @description checks whether the integer argument is a leap year or not
    * @param {Number} year - the integer to be tested for a leap year
    * @returns {Boolean} true if the integer argument can be considered as a leap year, false otherwise
    * @throws {Error} will throw an error if the argument is missing or isn't an integer
    */

    this.isLeapYear = function (year) {
        if ( typeof year === 'number' && Math.floor(year) === year ) {
            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        }
        throw new Error('(isLeapYear) invalid argument, expects an integer representing a year');
    };

    /**
    * @method isValidDate
    * @description checks if the object passed as an argument represents a valid date
    * @param {Object} date - an object representing the date to be validated
    * @param {Number} date.day - the day
    * @param {String} date.month - the month in plain English (or any other authorized language)
    * @param {Number} date.year - the year
    * @returns {Boolean} true if the object passed as an argument represents a valid date, false otherwise
    */

    this.isValidDate = function (date) {
        var _date = null;

        if ( !this.empty(date) && typeof date === 'object' ) {
            _date = _.clone(date);
            _date.month = typeof _date.month === 'string' ? _date.month.toLowerCase() : undefined;
        }

        return _date !== null &&
               typeof _date.year === 'number' &&
               typeof _date.month !== 'undefined' && month[_date.month] !== undefined &&
               typeof _date.day === 'number' && _date.day > 0 &&
               _date.day <= duration[month[_date.month]] + (month[_date.month] === 1 && this.isLeapYear(_date.year) ? 1 : 0);
    };

    /**
    * @method isNextYear
    * @description checks if the next occurrence of a day / month combinaison happens in the current year or in the next
    * @param {Object} date - an object representing a date in day / month format
    * @param {Number} date.day - the day
    * @param {String} date.month - the month in plain English (or any other authorized language)
    * @param {Date} [start=new Date()] - an optional Date object to test the day / month combinaison against (instead of the current date by default)
    * @returns {Boolean} true if the next occurrence of the day / month is in the upcoming year (compared to the optional start date or to the current date), false otherwise
    * @throws {Error} will throw an error if the date argument is missing or represents an invalid date (for the current year of the next depending on its value)
    */

    this.isNextYear = function (date, start) {
        var _date = null; // objects are passed by reference, we don't want to mingle with the original object

        start = start instanceof Date ? start : new Date();

        if ( !this.empty(date) && typeof date === 'object' ) {
            _date = _.clone(date);
            _date.month = typeof _date.month === 'string' ? _date.month.toLowerCase() : undefined;
            _date.year = start.getFullYear();
        } else {
            throw new Error('(isNextYear) missing or invalid argument type');
        }

        if ( this.isValidDate(_date) && (month[_date.month] > start.getMonth() || (month[_date.month] === start.getMonth() && _date.day >= start.getDate())) ) {
            return false;
        }

        _date.year++;

        if ( this.isValidDate(_date) && (start.getMonth() > month[_date.month] || (month[_date.month] === start.getMonth() && start.getDate() > _date.day)) ) {
            return true;
        }

        throw new Error('(isNextYear) invalid date argument');
    };

    /**
    * @method daysUntilNext
    * @description calculates the remaining number of days until the next occurrence of the day / month combinaison
    * @param {Object} date - an object representing a date in day / month format
    * @param {Number} date.day - the day
    * @param {String} date.month - the month in plain English (or any other authorized language)
    * @param {Date} [start=new Date()] - an optional date object from which to calculate the days until the next the day / month combinaison
    * @returns {Number} the number of days until the next occurrence of day / month
    */

    this.daysUntilNext = function (date, start) {
        var nbDays = 0, i = 0, _date = null; // objects are passed by reference, we don't want to mingle with the original object
        var startDay = 0, startMonth = 0, startYear = 0, isThisYearLeap = false, isNextYearLeap = false;

        start = start instanceof Date ? start : new Date();
        startDay = start.getDate();
        startMonth = start.getMonth();
        startYear = start.getFullYear();
        isThisYearLeap = this.isLeapYear(startYear);
        isNextYearLeap = this.isLeapYear(startYear + 1);

        if ( !this.empty(date) && typeof date === 'object' ) {
            _date = _.clone(date);
            _date.month = typeof _date.month === 'string' ? _date.month.toLowerCase() : undefined;
        } else {
            throw new Error('(daysUntil) missing or invalid argument type');
        }

        if ( this.isNextYear(_date, start) ) { // if no exception is thrown the date is valid
            nbDays += duration[startMonth] - startDay;
            for ( i = startMonth + 1 ; i < 12 + month[_date.month] ; i++ ) {
                nbDays += duration[i % 12];
            }
            nbDays += _date.day +
                      (((month[_date.month] > 1 && isNextYearLeap) || (month[_date.month] === 1 && isNextYearLeap && _date.day === 29) ||
                      (startMonth < 1 && isThisYearLeap) || (startMonth === 1 && isThisYearLeap && startDay < 29)) ? 1 : 0);
        } else if ( month[_date.month] > startMonth ) {
            nbDays += duration[startMonth] - startDay;
            for ( i = startMonth + 1 ; i < month[_date.month] ; i++ ) {
                nbDays += duration[i];
            }
            nbDays += _date.day +
                      ((isThisYearLeap && ((startMonth < 1 && month[_date.month] > 1 ) ||
                      (startMonth === 1 && startDay < 29) || (month[_date.month] === 1 && _date.day === 29))) ? 1 : 0);
        } else {
            nbDays = _date.day - startDay;
        }
        return nbDays;
    };

    /**
    * @method setLocale
    * @description sets the working locale
    * @param {String} [newLocale="en"] - an optional locale parameter as a string (i.e. "en", "fr", ... defaults to English)
    */

    this.setLocale = function (newLocale) {
        locale = !this.empty(newLocale) && typeof newLocale === 'string' && data.locales.indexOf(newLocale) > 0 ? newLocale : 'en';
        month = _.reduce(data.months, function (month, elm, index) {
            month[elm.name[locale]] = index;
            return month;
        }, {});
        if ( this.empty(duration) ) {
            duration = _.pluck(data.months, 'duration');
        }
    };

    this.setLocale(locale); // init private data according to the locale
}

module.exports =  dateHelper;