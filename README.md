# dateHelper

## Introduction

This module provides methods to manipulate dates and in particular calculate the number of days until the next occurrence of a date. Simple enough except when you decide (in a totally crazy way) to accurately take leap years into account.

What started as a quick and dirty hack of a couple of lines in a console became an excuse to develop a requirable module, practice test driven developments with [mocha](http://mochajs.org/) using [should.js](http://shouldjs.github.io/) assertions, write a proper documentation with [JSDoc](http://usejsdoc.org/) and finally get a quick introduction to [underscorejs](http://underscorejs.org/) ... just for the fun of it.

Yes I know ... how nerdy (or pathetic) is that!?!

## Installation

I'll assume here that you have some basic knowledge about `node`, `npm` and `mocha`, that they are already installed on your system and can be called from the command line.

Start by getting the code from github:
```
$ git clone https://github.com/p6ril/datehelper.git
```

Deploy the necessary modules:
```
$ cd datehelper
$ npm install
```

Optionally:

* check the result of the tests (requires building tools like `make`):
```
$ make
$ mocha -u tdd -c ./tests/*.js #if 'make' isn't available on your system
```
* Generate the API documentation (install jdsoc if necessary):
```
$ sudo npm install -g jdsoc
$ jsdoc ./lib/dateHelper.js
```

Try it yourself:
```
node app.js
```

Enjoy :-)

## Usage

The module returns a function that needs to be instantiated. It can take an additional parameter on instantiation that represents a locale. By default English is assumed, French is also provided, additional locales can easily be added in `lib/data.json`. The locale feature helps work with dates in a more natural way.
```javascript
var dateHelper = require('./lib/dateHelper.js');

dateHelper = new dateHelper();

var christmas = {
	day: 25,
	month: "December"
};
dateHelper.daysUntilNext(christmas);
```