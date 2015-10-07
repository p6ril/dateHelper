MOCHA = mocha
MOCHA_OPTS = -u tdd -c
TESTSDIR=./tests/
TESTFILES=*.js

all:
	$(MOCHA) $(MOCHA_OPTS) $(TESTSDIR)$(TESTFILES)
#.PHONY: test
