MOCHA = mocha
MOCHA_OPTS = --colors --reporter dot
TESTSDIR=./tests
TESTFILES=$(TESTSDIR)/test.js $(TESTSDIR)/test.en.js $(TESTSDIR)/test.fr.js

all:
	$(MOCHA) $(MOCHA_OPTS) $(TESTFILES)
#.PHONY: test
