'use strict';

var assert = require('assert');
var should = require('should');

var dateHelper = require('../lib/dateHelper');

dateHelper = new dateHelper('fr');

suite('dateHelper isValidDate() method test', function () {
	test('Testing with {day: 31, month: "octobre", year: 1972}', function (done) {
		dateHelper.isValidDate({day: 31, month: "octobre", year: 1972}).should.be.true();
		done();
	});
	test('Testing with {day: 30, month: "mai", year: 2010}', function (done) {
		dateHelper.isValidDate({day: 30, month: "mai", year: 2010}).should.be.true();
		done();
	});
	test('Testing with {day: 0, month: "mars", year: 1998}', function (done) {
		dateHelper.isValidDate({day: 0, month: "mars", year: 1998}).should.be.false();
		done();
	});
	test('Testing with {day: 32, month: "janvier", year: 1986}', function (done) {
		dateHelper.isValidDate({day: 32, month: "janvier", year: 1986}).should.be.false();
		done();
	});
	test('Testing with {day: 31, month: "novembre", year: 2001}', function (done) {
		dateHelper.isValidDate({day: 31, month: "novembre", year: 2001}).should.be.false();
		done();
	});
	test('Testing with {day: 29, month: "février", year: 2015}', function (done) {
		dateHelper.isValidDate({day: 29, month: "février", year: 2015}).should.be.false();
		done();
	});
	test('Testing with {day: 29, month: "février", year: 2016}', function (done) {
		dateHelper.isValidDate({day: 29, month: "février", year: 2016}).should.be.true();
		done();
	});
	test('Testing with {day: 12, year: 2005}', function (done) {
		dateHelper.isValidDate({day: 12, year: 2005}).should.be.false();
		done();
	});
	test('Testing with {month: "avril", year: 1981}', function (done) {
		dateHelper.isValidDate({month: "avril", year: 1981}).should.be.false();
		done();
	});
	test('Testing with {day: 8, month: "septembre"}', function (done) {
		dateHelper.isValidDate({day: 8, month: "septembre"}).should.be.false();
		done();
	});
	test('Testing with {day: 24, month: "foobar", year: 1969}', function (done) {
		dateHelper.isValidDate({day: 24, month: "foobar", year: 1969}).should.be.false();
		done();
	});
	test('Testing with {day: [3], month: "août", year: 1989}', function (done) {
		dateHelper.isValidDate({day: [3], month: "août", year: 1989}).should.be.false();
		done();
	});
	test('Testing with {day: 17, month: "décembre", year: {}}', function (done) {
		dateHelper.isValidDate({day: 17, month: "décembre", year: {}}).should.be.false();
		done();
	});
	test('Testing with {day: 3, month: "", year: 1917}', function (done) {
		dateHelper.isValidDate({day: 3, month: "", year: 1917}).should.be.false();
		done();
	});
});

suite('dateHelper isNextYear() method test', function () {
	var monthsIndex = {
			"janvier": 0,
			"février": 1,
			"mars": 2,
			"avril": 3,
			"mai": 4,
			"juin": 5,
			"juillet": 6,
			"août": 7,
			"septembre": 8,
			"octobre": 9,
			"novembre": 10,
			"décembre": 11
		},
		monthsName = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
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
	})({day: 29, month: "février"}, new Date(now.getFullYear(), 0, 12));

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
	})({day: 29, month: "février"}, new Date(now.getFullYear(), 9, 31));

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
	})({day: 29, month: "février"});
});

suite('dateHelper daysUntilNext() method test', function () {
	var now = new Date();
	test('Testing from janvier 1st until décembre 31st on a non leap year', function (done) {
		dateHelper.daysUntilNext({day:31, month:"décembre"}, new Date(2015, 0, 1)).should.equal(364);
		done();
	});
	test('Testing from janvier 1st until décembre 31st on a leap year', function (done) {
		dateHelper.daysUntilNext({day:31, month:"décembre"}, new Date(2012, 0, 1)).should.equal(365);
		done();
	});
	test('Testing from février 1st until mars 1st on a non leap year', function (done) {
		dateHelper.daysUntilNext({day:1, month:"mars"}, new Date(2015, 1, 1)).should.equal(28);
		done();
	});
	test('Testing from février 1st until mars 1st on a leap year', function (done) {
		dateHelper.daysUntilNext({day:1, month:"mars"}, new Date(2012, 1, 1)).should.equal(29);
		done();
	});
	test('Testing from octobre 28th until juin 26 on an upcoming leap year', function (done) {
		dateHelper.daysUntilNext({day:26, month:"juin"}, new Date(2015, 9, 28)).should.equal(242);
		done();
	});
	test('Testing from octobre 28th until juin 26 on an upcoming non leap year', function (done) {
		dateHelper.daysUntilNext({day:26, month:"juin"}, new Date(2013, 9, 28)).should.equal(241);
		done();
	});
	test('Testing from février 7th until janvier 13 on a leap year', function (done) {
		dateHelper.daysUntilNext({day:13, month:"janvier"}, new Date(2012, 1, 7)).should.equal(341);
		done();
	});
	test('Testing from février 7th until janvier 13 on a non leap year', function (done) {
		dateHelper.daysUntilNext({day:13, month:"janvier"}, new Date(2013, 1, 7)).should.equal(340);
		done();
	});
	test('Testing from février 5th until février 28 on a non leap year', function (done) {
		dateHelper.daysUntilNext({day:28, month:"février"}, new Date(2013, 1, 5)).should.equal(23);
		done();
	});
	test('Testing from février 5th until février 29 on a leap year', function (done) {
		dateHelper.daysUntilNext({day:29, month:"février"}, new Date(2012, 1, 5)).should.equal(24);
		done();
	});
});