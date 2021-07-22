#!/bin/bash

# see https://developers.google.com/web/updates/2019/01/emscripten-npm

set -e

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

export EM_CACHE=$TMP
export PROG=secp256k1.js
export WASM=secp256k1.wasm
export SRC=secp256k1.c

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
   -s EXPORTED_FUNCTIONS='[ "_malloc", "_free", "_secp256k1_context_create", "_secp256k1_ec_pubkey_create", "_secp256k1_ecdsa_recover", "_secp256k1_ecdsa_recoverable_signature_serialize_compact", "_secp256k1_ecdsa_sign", "_secp256k1_ecdsa_recoverable_signature_parse_compact", "_secp256k1_ecdsa_signature_parse_der", "_secp256k1_ecdsa_sign", "_secp256k1_ec_seckey_verify", "_secp256k1_ecdsa_sign_recoverable", "_secp256k1_context_randomize", "_secp256k1_ec_pubkey_parse", "_secp256k1_ec_pubkey_serialize", "_secp256k1_ec_seckey_verify", "_secp256k1_ecdsa_recoverable_signature_serialize_compact", "_secp256k1_ecdsa_recoverable_signature_convert", "_secp256k1_ecdsa_signature_parse_compact", "_secp256k1_ecdsa_signature_serialize_compact", "_secp256k1_ecdsa_signature_serialize_der", "_secp256k1_ecdsa_verify", "_secp256k1_fe_const", "_secp256k1_ge_of_fields", "_secp256k1_scalar_const", "_secp256k1_gej_of_fields", "_secp256k1_fe_set_b32", "_secp256k1_gej_set_ge", "_secp256k1_sizeof_secp256k1_num", "_secp256k1_num_set_bin", "_secp256k1_num_is_zero", "_secp256k1_scalar_is_one", "_secp256k1_scalar_is_zero", "_secp256k1_scalar_is_even", "_secp256k1_scalar_set_b32", "_secp256k1_scalar_get_b32", "_secp256k1_ge_set_gej", "_secp256k1_ecmult_const", "_secp256k1_scalar_mul", "_secp256k1_scalar_add", "_secp256k1_eckey_pubkey_serialize", "_secp256k1_scalar_negate", "_secp256k1_scalar_inverse", "_secp256k1_gej_add_var" ]'

)
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="
