.PHONY: all test test-js test-all clean

all:
	dune build @install @runtest

test:
	dune build @runtest

test-js:
	dune build @runtest-js

test-all:
	dune build @runtest @runtest-js

clean:
	dune clean
