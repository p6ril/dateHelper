(function(){
	'use strict';
	var assert = require('assert'),
		should = require('should');

	var dateHelper = require('../lib/dateHelper');
	dateHelper = new dateHelper();

	describe('Testing non locale specific methods', function () {

		describe('dateHelper.empty() method test', function () {
			it('should return true when called with no argument', function () {
				dateHelper.empty().should.be.true();
			});
			it('should return true when called with \'undefined\'', function () {
				dateHelper.empty(undefined).should.be.true();
			});
			it('should return true when called with \'null\'', function () {
				dateHelper.empty(null).should.be.true();
			});
			it('should return true when called with an empty array (i.e. array.length = 0)', function () {
				dateHelper.empty([]).should.be.true();
			});
			it('should return true when called with an empty string (i.e. string.length = 0)', function () {
				dateHelper.empty("").should.be.true();
			});
			it('should return false when called with a non null object ({})', function () {
				dateHelper.empty({}).should.be.false();
			});
			it('should return false when called with a non null object ({foo: "bar"})', function () {
				dateHelper.empty({foo: "bar"}).should.be.false();
			});
			it('should return false when called with a non empty array ([1, 2, 3])', function () {
				dateHelper.empty([1, 2, 3]).should.be.false();
			});
			it('should return false when called with a non empty string ("hello world")', function () {
				dateHelper.empty("hello world").should.be.false();
			});
			it('should return false when called with a number (0)', function () {
				dateHelper.empty(0).should.be.false();
			});
			it('should return false when called with a number (57)', function () {
				dateHelper.empty(57).should.be.false();
			});
			it('should return false when called with a boolean (true)', function () {
				dateHelper.empty(true).should.be.false();
			});
			it('should return false when called with a boolean (false)', function () {
				dateHelper.empty(false).should.be.false();
			});
		});

		describe('dateHelper.isLeapYear() method test', function () {
			it('should return true when called with 2000', function () {
				dateHelper.isLeapYear(2000).should.be.true();
			});
			for ( var i = 2008 ; i < 2018 ; i ++ ) {
				(function (year) {
					var bool = year % 4 === 0;

					it('should return ' + bool.toString() + ' when called with ' + year, function () {
						if ( bool ) {
							dateHelper.isLeapYear(year).should.be.true();
						} else {
							dateHelper.isLeapYear(year).should.be.false();
						}
					});
				})(i);
			}
			it('should return false when called with 2100', function () {
				dateHelper.isLeapYear(2100).should.be.false();
			});
			it('should throw an exception if called with no argument', function () {
				(function () { dateHelper.isLeapYear(); }).should.throw();
			});
			it('should throw an exception if called with \'undefined\' as an argument', function () {
				(function () { dateHelper.isLeapYear(undefined); }).should.throw();
			});
			it('should throw an exception if called with \'null\' as an argument', function () {
				(function () { dateHelper.isLeapYear(null); }).should.throw();
			});
			it('should throw an exception if called with an object as an argument', function () {
				(function () { dateHelper.isLeapYear({foo: "bar"}); }).should.throw();
			});
			it('should throw an exception if called with a string as an argument', function () {
				(function () { dateHelper.isLeapYear("hello"); }).should.throw();
			});
			it('should throw an exception if called with a boolean as an argument', function () {
				(function () { dateHelper.isLeapYear(true); }).should.throw();
			});
		});
	});
}());