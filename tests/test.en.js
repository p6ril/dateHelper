'use strict';

var assert = require('assert');
var should = require('should');

var dateHelper = require('../lib/dateHelper');

dateHelper = new dateHelper();

suite('dateHelper empty() method test', function () {
	test('Testing with no argument', function (done) {
		dateHelper.empty().should.be.true();
		done();
	});
	test('Testing with undefined', function (done) {
		dateHelper.empty(undefined).should.be.true();
		done();
	});
	test('Testing with null', function (done) {
		dateHelper.empty(null).should.be.true();
		done();
	});
	test('Testing with an empty array (i.e. array.length = 0)', function (done) {
		dateHelper.empty([]).should.be.true();
		done();
	});
	test('Testing with an empty string (i.e. string.length = 0)', function (done) {
		dateHelper.empty('').should.be.true();
		done();
	});
	test('Testing with a non null object ({})', function (done) {
		dateHelper.empty({}).should.be.false();
		done();
	});
	test('Testing with a non null object ({foo: "bar"})', function (done) {
		dateHelper.empty({foo: "bar"}).should.be.false();
		done();
	});
	test('Testing with a non empty array ([1, 2, 3])', function (done) {
		dateHelper.empty([1, 2, 3]).should.be.false();
		done();
	});
	test('Testing with a non empty string ("hello world")', function (done) {
		dateHelper.empty("hello world").should.be.false();
		done();
	});
	test('Testing with a number (0)', function (done) {
		dateHelper.empty(0).should.be.false();
		done();
	});
	test('Testing with a number (57)', function (done) {
		dateHelper.empty(57).should.be.false();
		done();
	});
	test('Testing with a boolean (true)', function (done) {
		dateHelper.empty(true).should.be.false();
		done();
	});
	test('Testing with a boolean (false)', function (done) {
		dateHelper.empty(false).should.be.false();
		done();
	});
});

suite('dateHelper isLeapYear() method test', function () {
	test('Testing with year 2000', function (done) {
		dateHelper.isLeapYear(2000).should.be.true();
		done();
	});
	test('Testing with year 2008', function (done) {
		dateHelper.isLeapYear(2008).should.be.true();
		done();
	});
	test('Testing with year 2009', function (done) {
		dateHelper.isLeapYear(2009).should.be.false();
		done();
	});
	test('Testing with year 2010', function (done) {
		dateHelper.isLeapYear(2010).should.be.false();
		done();
	});
	test('Testing with year 2011', function (done) {
		dateHelper.isLeapYear(2011).should.be.false();
		done();
	});
	test('Testing with year 2012', function (done) {
		dateHelper.isLeapYear(2012).should.be.true();
		done();
	});
	test('Testing with year 2013', function (done) {
		dateHelper.isLeapYear(2013).should.be.false();
		done();
	});
	test('Testing with year 2014', function (done) {
		dateHelper.isLeapYear(2014).should.be.false();
		done();
	});
	test('Testing with year 2015', function (done) {
		dateHelper.isLeapYear(2015).should.be.false();
		done();
	});
	test('Testing with year 2016', function (done) {
		dateHelper.isLeapYear(2016).should.be.true();
		done();
	});
	test('Testing with year 2100', function (done) {
		dateHelper.isLeapYear(2100).should.be.false();
		done();
	});
	test('Testing with no input', function (done) {
		(function () { dateHelper.isLeapYear(); }).should.throw();
		done();
	});
	test('Testing with a string as an input', function (done) {
		(function () { dateHelper.isLeapYear("hello"); }).should.throw();
		done();
	});
	test('Testing with a boolean as an input', function (done) {
		(function () { dateHelper.isLeapYear(true); }).should.throw();
		done();
	});
	test('Testing with an object as an input', function (done) {
		(function () { dateHelper.isLeapYear({foo: "bar"}); }).should.throw();
		done();
	});
});

suite('dateHelper isValidDate() method test', function () {
	test('Testing with {day: 31, month: "October", year: 1972}', function (done) {
		dateHelper.isValidDate({day: 31, month: "October", year: 1972}).should.be.true();
		done();
	});
	test('Testing with {day: 30, month: "May", year: 2010}', function (done) {
		dateHelper.isValidDate({day: 30, month: "May", year: 2010}).should.be.true();
		done();
	});
	test('Testing with {day: 0, month: "March", year: 1998}', function (done) {
		dateHelper.isValidDate({day: 0, month: "March", year: 1998}).should.be.false();
		done();
	});
	test('Testing with {day: 32, month: "January", year: 1986}', function (done) {
		dateHelper.isValidDate({day: 32, month: "January", year: 1986}).should.be.false();
		done();
	});
	test('Testing with {day: 31, month: "November", year: 2001}', function (done) {
		dateHelper.isValidDate({day: 31, month: "November", year: 2001}).should.be.false();
		done();
	});
	test('Testing with {day: 29, month: "February", year: 2015}', function (done) {
		dateHelper.isValidDate({day: 29, month: "February", year: 2015}).should.be.false();
		done();
	});
	test('Testing with {day: 29, month: "February", year: 2016}', function (done) {
		dateHelper.isValidDate({day: 29, month: "February", year: 2016}).should.be.true();
		done();
	});
	test('Testing with {day: 12, year: 2005}', function (done) {
		dateHelper.isValidDate({day: 12, year: 2005}).should.be.false();
		done();
	});
	test('Testing with {month: "April", year: 1981}', function (done) {
		dateHelper.isValidDate({month: "April", year: 1981}).should.be.false();
		done();
	});
	test('Testing with {day: 8, month: "September"}', function (done) {
		dateHelper.isValidDate({day: 8, month: "September"}).should.be.false();
		done();
	});
	test('Testing with {day: 24, month: "foobar", year: 1969}', function (done) {
		dateHelper.isValidDate({day: 24, month: "foobar", year: 1969}).should.be.false();
		done();
	});
	test('Testing with {day: [3], month: "August", year: 1989}', function (done) {
		dateHelper.isValidDate({day: [3], month: "August", year: 1989}).should.be.false();
		done();
	});
	test('Testing with {day: 17, month: "December", year: {}}', function (done) {
		dateHelper.isValidDate({day: 17, month: "December", year: {}}).should.be.false();
		done();
	});
	test('Testing with {day: 3, month: "", year: 1917}', function (done) {
		dateHelper.isValidDate({day: 3, month: "", year: 1917}).should.be.false();
		done();
	});
});

suite('dateHelper isNextYear() method test', function () {
	var monthsIndex = {
			"January": 0,
			"February": 1,
			"March": 2,
			"April": 3,
			"May": 4,
			"June": 5,
			"July": 6,
			"August": 7,
			"September": 8,
			"October": 9,
			"November": 10,
			"December": 11
		},
		monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		duration = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		now = new Date(),
		date = {},
		month = '';

	for ( month in monthsIndex ) {
		date.day = Math.floor(Math.random() * 27) + 1;
		date.month = month;
		(function (date) {
			test('Testing with {day: ' + date.day + ', month: ' + date.month + '}', function (done) {
				if ( now.getMonth() > monthsIndex[date.month] || (monthsIndex[date.month] === now.getMonth() && now.getDate() > date.day) ) {
					dateHelper.isNextYear(date).should.be.true();
				} else {
					dateHelper.isNextYear(date).should.be.false();
				}
				done();
			});
		})({day: date.day, month: date.month}); // tests appear to be queued and only executed at the end of the loop
	}
	
	(function (date, origin) {
		var isLeapYear = dateHelper.isLeapYear(origin.getFullYear());
		test('Testing with {day: ' + date.day + ', month: ' + date.month + '} simulating ' + monthsName[origin.getMonth()] + ' ' + origin.getDate() + ' on a ' + (isLeapYear ? '' : 'non ') + 'leap year', function (done) {
			if ( isLeapYear ) {
				dateHelper.isNextYear(date, origin).should.be.false();
			} else {
				(function () { dateHelper.isNextYear(date, origin); }).should.throw();
			}
			done();
		});
	})({day: 29, month: "February"}, new Date(now.getFullYear(), 0, 12));

	(function (date, origin) {
		var isLeapYear = dateHelper.isLeapYear(origin.getFullYear() + 1);
		test('Testing with {day: ' + date.day + ', month: ' + date.month + '} simulating ' + monthsName[origin.getMonth()] + ' ' + origin.getDate() + ' with next year being ' + (isLeapYear ? 'leap ' : 'not leap'), function (done) {
			if ( isLeapYear ) {
				dateHelper.isNextYear(date, origin).should.be.true();
			} else {
				(function () { dateHelper.isNextYear(date, origin); }).should.throw();
			}
			done();
		});
	})({day: 29, month: "February"}, new Date(now.getFullYear(), 9, 31));

	(function (date) {
		test('Testing with {day: ' + date.day + ', month: ' + date.month + '} from the current date', function (done) {
			if ( dateHelper.isLeapYear(now.getFullYear()) && (monthsIndex[date.month] > now.getMonth() || (monthsIndex[date.month] === now.getMonth() && date.day > now.getDate())) ) {
				dateHelper.isNextYear(date).should.be.false();
			} else if ( dateHelper.isLeapYear(now.getFullYear() + 1) && (now.getMonth() > monthsIndex[date.month] || (monthsIndex[date.month] === now.getMonth() && now.getDate() > date.day)) ) {
				dateHelper.isNextYear(date).should.be.true();
			} else {
				(function () { dateHelper.isNextYear(date); }).should.throw();
			}
			done();
		});
	})({day: 29, month: "February"});
});

suite('dateHelper daysUntilNext() method test', function () {
	var now = new Date();
	test('Testing from January 1st until December 31st on a non leap year', function (done) {
		dateHelper.daysUntilNext({day:31, month:"December"}, new Date(2015, 0, 1)).should.equal(364);
		done();
	});
	test('Testing from January 1st until December 31st on a leap year', function (done) {
		dateHelper.daysUntilNext({day:31, month:"December"}, new Date(2012, 0, 1)).should.equal(365);
		done();
	});
	test('Testing from February 1st until March 1st on a non leap year', function (done) {
		dateHelper.daysUntilNext({day:1, month:"March"}, new Date(2015, 1, 1)).should.equal(28);
		done();
	});
	test('Testing from February 1st until March 1st on a leap year', function (done) {
		dateHelper.daysUntilNext({day:1, month:"March"}, new Date(2012, 1, 1)).should.equal(29);
		done();
	});
	test('Testing from October 28th until June 26 on an upcoming leap year', function (done) {
		dateHelper.daysUntilNext({day:26, month:"June"}, new Date(2015, 9, 28)).should.equal(242);
		done();
	});
	test('Testing from October 28th until June 26 on an upcoming non leap year', function (done) {
		dateHelper.daysUntilNext({day:26, month:"June"}, new Date(2013, 9, 28)).should.equal(241);
		done();
	});
	test('Testing from February 7th until January 13 on a leap year', function (done) {
		dateHelper.daysUntilNext({day:13, month:"January"}, new Date(2012, 1, 7)).should.equal(341);
		done();
	});
	test('Testing from February 7th until January 13 on a non leap year', function (done) {
		dateHelper.daysUntilNext({day:13, month:"January"}, new Date(2013, 1, 7)).should.equal(340);
		done();
	});
	test('Testing from February 5th until February 28 on a non leap year', function (done) {
		dateHelper.daysUntilNext({day:28, month:"February"}, new Date(2013, 1, 5)).should.equal(23);
		done();
	});
	test('Testing from February 5th until February 29 on a leap year', function (done) {
		dateHelper.daysUntilNext({day:29, month:"February"}, new Date(2012, 1, 5)).should.equal(24);
		done();
	});
});