.PHONY: all test test-js test-all clean fmt fmt-js

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

fmt:
	dune build @fmt --auto-promote

fmt-js:
	npx prettier -w src/runtime*.js
