(function(){
	'use strict';
	var assert = require('assert'),
		should = require('should'),
		_ = require('underscore');

	var dateHelper = require('../lib/dateHelper'),
		data = require('../lib/data'),
		locale = "en";
	dateHelper = new dateHelper();

	describe('Testing locale specific methods (English)', function () {

		describe('dateHelper.isValidDate() method test', function () {
			it('should return true when called with argument {day: 31, month: "October", year: 1972}', function () {
				dateHelper.isValidDate({day: 31, month: "October", year: 1972}).should.be.true();
			});
			it('should return true when called with argument {day: 30, month: "May", year: 2010}', function () {
				dateHelper.isValidDate({day: 30, month: "May", year: 2010}).should.be.true();
			});
			it('should return false when called with argument {day: 0, month: "March", year: 1998}', function () {
				dateHelper.isValidDate({day: 0, month: "March", year: 1998}).should.be.false();
			});
			it('should return false when called with argument {day: 32, month: "January", year: 1986}', function () {
				dateHelper.isValidDate({day: 32, month: "January", year: 1986}).should.be.false();
			});
			it('should return false when called with argument {day: 31, month: "November", year: 2001}', function () {
				dateHelper.isValidDate({day: 31, month: "November", year: 2001}).should.be.false();
			});
			it('should return false when called with argument {day: 29, month: "February", year: 2015}', function () {
				dateHelper.isValidDate({day: 29, month: "February", year: 2015}).should.be.false();
			});
			it('should return true when called with argument {day: 29, month: "February", year: 2016}', function () {
				dateHelper.isValidDate({day: 29, month: "February", year: 2016}).should.be.true();
			});
			it('should return false when called with argument {day: 12, year: 2005}', function () {
				dateHelper.isValidDate({day: 12, year: 2005}).should.be.false();
			});
			it('should return false when called with argument {month: "April", year: 1981}', function () {
				dateHelper.isValidDate({month: "April", year: 1981}).should.be.false();
			});
			it('should return false when called with argument {day: 8, month: "September"}', function () {
				dateHelper.isValidDate({day: 8, month: "September"}).should.be.false();
			});
			it('should return false when called with argument {day: 24, month: "foobar", year: 1969}', function () {
				dateHelper.isValidDate({day: 24, month: "foobar", year: 1969}).should.be.false();
			});
			it('should return false when called with argument {day: [3], month: "August", year: 1989}', function () {
				dateHelper.isValidDate({day: [3], month: "August", year: 1989}).should.be.false();
			});
			it('should return false when called with argument {day: 17, month: "December", year: {}}', function () {
				dateHelper.isValidDate({day: 17, month: "December", year: {}}).should.be.false();
			});
			it('should return false when called with argument {day: 3, month: "", year: 1917}', function () {
				dateHelper.isValidDate({day: 3, month: "", year: 1917}).should.be.false();
			});
			// the tests below are indepedent of the locale
			it('should return false when called with no argument', function () {
				dateHelper.isValidDate().should.be.false();
			});
			it('should return false when called with \'undefined\'', function () {
				dateHelper.isValidDate(undefined).should.be.false();
			});
			it('should return false when called with \'null\'', function () {
				dateHelper.isValidDate(null).should.be.false();
			});
			it('should return false when called with an empty object', function () {
				dateHelper.isValidDate({}).should.be.false();
			});
			it('should return false when called with any object ({foo: "bar"})', function () {
				dateHelper.isValidDate({foo: "bar"}).should.be.false();
			});
			it('should return false when called with an empty array', function () {
				dateHelper.isValidDate([]).should.be.false();
			});
			it('should return false when called with any array ([1, 2, 3])', function () {
				dateHelper.isValidDate([1, 2, 3]).should.be.false();
			});
			it('should return false when called with a string', function () {
				dateHelper.isValidDate("hello").should.be.false();
			});
			it('should return false when called with a number', function () {
				dateHelper.isValidDate(45).should.be.false();
			});
		});

		describe('dateHelper.isNextYear() method test', function () {
			var index = _.reduce(data.months, function (month, elm, i) {
						month[elm.name[locale]] = i;
						return month;
					}, {}),
				name = _.map(data.months, function (obj) {
						return obj.name[locale];
					}),
				duration = _.pluck(data.months, 'duration'),
				now = new Date(),
				date = {},
				month = '',
				bool = false;

			for ( month in index ) {
				date.day = _.random(1, 28);
				date.month = month;
				bool = now.getMonth() > index[month] || (now.getMonth() === index[month] && now.getDate() > date.day);
				(function (bool, date) {
					it('should return ' + bool.toString() + ' when called with {day: ' + date.day + ', month: "' + date.month + '"}', function () {
						if ( bool ) {
							dateHelper.isNextYear(date).should.be.true();
						} else {
							dateHelper.isNextYear(date).should.be.false();
						}
					});
				})(bool, _.clone(date)); // beware date is an object passed by reference
			}

			(function (date, origin) {
				var bool = dateHelper.isLeapYear(origin.getFullYear());

				it('should ' + (bool ? 'return false' : 'throw an exception') + ' when called with argument {day: ' + date.day + ', month: "' + date.month + '"} on ' + name[origin.getMonth()] + ' ' + origin.getDate() + ' this year', function () {
					if ( bool ) {
						dateHelper.isNextYear(date, origin).should.be.false();
					} else {
						(function () { dateHelper.isNextYear(date, origin); }).should.throw();
					}
				});
			})({day: 29, month: "February"}, new Date(now.getFullYear(), 0, 12));

			(function (date, origin) {
				var bool = dateHelper.isLeapYear(origin.getFullYear() + 1);

				it('should ' + (bool ? 'return true' : 'throw an exception') + ' when called with argument {day: ' + date.day + ', month: "' + date.month + '"} on ' + name[origin.getMonth()] + ' ' + origin.getDate() + ' this year', function () {
					if ( bool ) {
						dateHelper.isNextYear(date, origin).should.be.true();
					} else {
						(function () { dateHelper.isNextYear(date, origin); }).should.throw();
					}
				});
			})({day: 29, month: "February"}, new Date(now.getFullYear(), 9, 31));
		});

		describe('dateHelper.daysUntilNext() method test', function () {
			it('should return 364 from January 1st until December 31st on a normal year', function () {
				dateHelper.daysUntilNext({day: 31, month: "December"}, new Date(1997, 0, 1)).should.equal(364);
			});
			it('should return 365 from January 1st until December 31st on a leap year', function () {
				dateHelper.daysUntilNext({day: 31, month: "December"}, new Date(2012, 0, 1)).should.equal(365);
			});
			it('should return 28 from February 1st until March 1st on a normal year', function () {
				dateHelper.daysUntilNext({day: 1, month: "March"}, new Date(2015, 1, 1)).should.equal(28);
			});
			it('should return 29 from February 1st until March 1st on a leap year', function () {
				dateHelper.daysUntilNext({day: 1, month: "March"}, new Date(2008, 1, 1)).should.equal(29);
			});
			it('should return 242 from October 28th until June 26th on an upcoming leap year', function () {
				dateHelper.daysUntilNext({day:26, month: "June"}, new Date(2015, 9, 28)).should.equal(242);
			});
			it('should return 241 from October 28th until June 26th on an upcoming normal year', function () {
				dateHelper.daysUntilNext({day:26, month: "June"}, new Date(2002, 9, 28)).should.equal(241);
			});
			it('should return 341 from February 7th until January 13th on a leap year', function () {
				dateHelper.daysUntilNext({day:13, month: "January"}, new Date(2012, 1, 7)).should.equal(341);
			});
			it('should return 340 from February 7th until January 13th on a normal year', function () {
				dateHelper.daysUntilNext({day:13, month: "January"}, new Date(2013, 1, 7)).should.equal(340);
			});
			it('should return 24 from February 5th until February 29th on a leap year', function () {
				dateHelper.daysUntilNext({day:29, month: "February"}, new Date(2012, 1, 5)).should.equal(24);
			});
			it('should return 23 from February 5th until February 28th on a normal year', function () {
				dateHelper.daysUntilNext({day:28, month: "February"}, new Date(2013, 1, 5)).should.equal(23);
			});
			it('should return 101 from August 12th until Novembre 21st', function () {
				dateHelper.daysUntilNext({day:21, month: "November"}, new Date(2015, 7, 12)).should.equal(101);
			});
		});
	});
}());