#!/bin/sh

set -e

VERSION=cd329dbc3eaf096ae007e807b86b6f5947621ee3

SRC_FILES="eckey.h eckey_impl.h ecmult_const.h ecmult_const_impl.h ecmult_impl.h field.h field_10x26_impl.h field_5x52_impl.h field_impl.h group.h group_impl.h num.h num_gmp_impl.h scalar.h scalar_4x64_impl.h scalar_8x32_impl.h scalar_impl.h scalar_low_impl.h secp256k1.c basic-config.h bench.h ecdsa.h ecdsa_impl.h ecmult.h ecmult_gen.h ecmult_gen_impl.h  field_10x26.h field_5x52.h field_5x52_asm_impl.h field_5x52_int128_impl.h hash.h hash_impl.h num_gmp.h num_impl.h scalar_4x64.h scalar_8x32.h scalar_low.h scratch.h scratch_impl.h  testrand.h testrand_impl.h util.h ecmult_static_context.h"

INC_FILES="secp256k1_ecdh.h secp256k1.h secp256k1_recovery.h"

(which libtoolize > /dev/null) || (echo "libtoolize not found, please install 'libtool'"; exit 1)

if [ ! -d bitcoin-core-secp256k1 ]; then
    echo "Cloning bitcoin-core/secp256k1.git"
    git clone https://github.com/bitcoin-core/secp256k1.git bitcoin-core-secp256k1 -q
fi
cd bitcoin-core-secp256k1
echo "Checking out ${VERSION}"
git checkout "${VERSION}" -q

echo "Building"
./autogen.sh
./configure
make

echo "Copying files"
(cd src && cp $SRC_FILES ../../src/)
(cd include && cp $INC_FILES ../../src/)

cp src/modules/ecdh/main_impl.h ../src/ecdh.h
cp src/modules/recovery/main_impl.h ../src/recovery.h

echo "Patching files"
sed -i 's/"modules\/ecdh\/main_impl.h"/"ecdh.h"/' ../src/secp256k1.c
sed -i 's/"modules\/recovery\/main_impl.h"/"recovery.h"/' ../src/secp256k1.c
sed -i 's/#include "src\/\([^.]*\).h"/#include "\1.h"/' ../src/*.h ../src/*.c
sed -i 's/#include "include\/\([^.]*\).h"/#include "\1.h"/' ../src/*.h ../src/*.c
echo '#include "secp256k1_stubs.c"' >> ../src/secp256k1.c
