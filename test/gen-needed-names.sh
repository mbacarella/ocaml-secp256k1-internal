#!/bin/sh
grep -oh 'call_wasm( *\"[^"]*' $* | (sed 's/.*"//' && echo "_free" && echo "_malloc") | sort -u
