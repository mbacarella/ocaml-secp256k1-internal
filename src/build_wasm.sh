#!/bin/bash

# see https://developers.google.com/web/updates/2019/01/emscripten-npm

set -e

if [ ! -f export  ]; then
  echo "'export' file not found, run the script from the src directory"
  exit 1
fi

# before running this script you must install emsdk and initialize
# the emsdk environment using the command :
# source emsdk_env.sh

if [ ! -e "$EMSDK" ]; then
  echo "emsdk not installed. please run \`source emsdk_env.sh \` first"
  exit 1
fi

if [ ! -e "$OPAM_SWITCH_PREFIX" ]; then
  echo "no opam switch found. The build might fail"
fi

eval "$(opam env)"

EXPORTED_FUNCTIONS=$(cat export | xargs -I {} -n 1 echo \"{}\" | tr '\n' ',' | sed 's/\(.*\),$/[\1]/')

if [ ! -f ext/lib/libgmp.a  ]; then
  if [ ! -f gmp-6.1.2.tar.lz ]; then
    wget https://gmplib.org/download/gmp/gmp-6.1.2.tar.lz
  fi
  tar xf gmp-6.1.2.tar.lz
  mkdir -p ext
  cd gmp-6.1.2
  emconfigure ./configure --disable-assembly --host none --enable-cxx --prefix="$PWD/../ext"
  make
  make install
  cd ..
fi

export LDFLAGS="$LDFLAGS -L$OPAM_SWITCH_PREFIX/lib"
export CFLAGS="$CFLAGS -I/usr/include/x86_64-linux-gnu -I$OPAM_SWITCH_PREFIX/lib/ocaml -I$OPAM_SWITCH_PREFIX/lib/gmp -Iext/lib -Iext/include"


mkdir -p src-wasm
cp *.c *.h src-wasm


NAMES="$(cat export| xargs echo) _secp256k1_scalar_mul_512"
echo $NAMES
NAMES=$(echo "$NAMES" | sed 's/ _/\\|/g')
echo $NAMES
sed -i "s/^\(SECP256K1_INLINE \)\?static \(.* \)\($NAMES\)\((.*\)$/\1\2\3\4/g" src-wasm/*.h
sed -i "s/^static\( SECP256K1_INLINE\)\?\(.* \)\($NAMES\)\((q.*\)$/\1\2\3\4/g" src-wasm/*.h



export EM_CACHE=$TMP
export PROG=secp256k1.js
export WASM=secp256k1.wasm
export SRC=src-wasm/secp256k1.c

# -O0: Don't do any optimization. No dead code is eliminated, and Emscripten does not minify the JavaScript code it emits, either. Good for debugging.
# -O3: Optimize aggressively for performance.
# -Os: Optimize aggressively for performance and size as a secondary criterion.
# -Oz: Optimize aggressively for size, sacrificing performance if necessary.
export OPTIMIZE=" -Os"

echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="
(
  # Compile C/C++ code
  emcc "$OPTIMIZE" $LDFLAGS $CFLAGS ext/lib/libgmp.a -o "$PROG" "$SRC" \
   -DUSE_SCALAR_8X32 \
   -DUSE_FIELD_10X26 \
   -DUSE_NUM_GMP \
   -DUSE_FIELD_INV_BUILTIN \
   -DUSE_SCALAR_INV_BUILTIN \
   -DSECP256K1_INLINE=inline \
   -DSECP256K1_RESTRICT=restrict \
   -DSECP256K1_TAG_PUBKEY_EVEN=0x02 \
   -DSECP256K1_TAG_PUBKEY_ODD=0x03 \
   -DSECP256K1_TAG_PUBKEY_UNCOMPRESSED=0x04 \
   -DSECP256K1_TAG_PUBKEY_HYBRID_EVEN=0x06 \
   -DSECP256K1_TAG_PUBKEY_HYBRID_ODD=0x07 \
   -DENABLE_EMSCRIPTEN_STUBS \
   -DENABLE_MODULE_RECOVERY \
   -s ALLOW_MEMORY_GROWTH=1 \
   -s WASM=1 \
   -s MALLOC=emmalloc \
   -s EXPORT_ES6=0 \
   -s FILESYSTEM=0 \
   -s MODULARIZE=1 \
   -s "EXPORT_NAME='_SECP256K1'" \
   -s EXPORTED_FUNCTIONS="$EXPORTED_FUNCTIONS"

)
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="
