//global: _SECP256K1

//Provides: caml_secp256k1_context_create
//Requires: caml_failwith, call_wasm
function caml_secp256k1_context_create (flags) {
    var ctx = call_wasm("_secp256k1_context_create",flags);
    if (!ctx) caml_failwith("context_create");
    return ctx;
}
//Provides: caml_secp256k1_context_randomize
//Requires: call_wasm
function caml_secp256k1_context_randomize (ctx, seed) {
    return call_wasm("_secp256k1_context_randomize",ctx,seed) ? 1 : 0;
}
//Provides: caml_secp256k1_context_clone
//Requires: caml_failwith, call_wasm
function caml_secp256k1_context_clone (ctx) {
    var n = call_wasm("_secp256k1_context_clone", ctx);
    if (n) caml_failwith("context_clone");
    return n;
}
//Provides: caml_secp256k1_ec_seckey_verify
//Requires: call_wasm
function caml_secp256k1_ec_seckey_verify (ctx, sk) {
    return call_wasm("_secp256k1_ec_seckey_verify",ctx, sk) ? 1 : 0;
}
//Provides: caml_secp256k1_ec_privkey_negate
//Requires: call_wasm
function caml_secp256k1_ec_privkey_negate(ctx, sk) {
    call_wasm("_secp256k1_ec_privkey_negate",ctx, sk);
    return 0;
}
//Provides: caml_secp256k1_ec_privkey_tweak_add
//Requires: call_wasm
function caml_secp256k1_ec_privkey_tweak_add(ctx, sk, tweak) {
    return call_wasm("_secp256k1_ec_privkey_tweak_add",
		      ctx,
		      sk,
		      tweak) ? 1 : 0;
}
//Provides: caml_secp256k1_ec_privkey_tweak_mul
//Requires: call_wasm
function caml_secp256k1_ec_privkey_tweak_mul(ctx, sk, tweak) {
    return call_wasm("_secp256k1_ec_privkey_tweak_mul", ctx, sk, tweak) ? 1 : 0;
}
//Provides: caml_secp256k1_ec_pubkey_create
//Requires: call_wasm
function caml_secp256k1_ec_pubkey_create (ctx, buf, sk) {
    return call_wasm("_secp256k1_ec_pubkey_create",
		      ctx,
		      buf,
		      sk) ? 1 : 0;
}
//Provides: caml_secp256k1_ec_pubkey_serialize
//Requires: call_wasm, wasm_int_pointer
function caml_secp256k1_ec_pubkey_serialize (ctx, buf, pk) {
    var SECP256K1_FLAGS_TYPE_COMPRESSION = 1 << 1;
    var SECP256K1_FLAGS_BIT_COMPRESSION = 1 << 8;
    var SECP256K1_EC_COMPRESSED =
        SECP256K1_FLAGS_TYPE_COMPRESSION | SECP256K1_FLAGS_BIT_COMPRESSION;
    var SECP256K1_EC_UNCOMPRESSED =
        SECP256K1_FLAGS_TYPE_COMPRESSION;
    var size = buf.data.length
    var flags =
        size == 33 ? SECP256K1_EC_COMPRESSED : SECP256K1_EC_UNCOMPRESSED;

    var size_ba = wasm_int_pointer(size);
    call_wasm("_secp256k1_ec_pubkey_serialize",
	      ctx,
              buf,
              size_ba,
              pk,
              flags);
    return size_ba.data[0];
}

//Provides: caml_secp256k1_ec_pubkey_parse
//Requires: call_wasm
function caml_secp256k1_ec_pubkey_parse(ctx, buf, pk) {
    var pk_len = pk.data.length;
    return call_wasm("_secp256k1_ec_pubkey_parse",
		     ctx,
		     buf,
		     pk,
		     pk_len) ? 1 : 0;
}
//Provides: caml_secp256k1_ec_pubkey_negate
//Requires: call_wasm
function caml_secp256k1_ec_pubkey_negate(ctx, pk) {
    call_wasm("_secp256k1_ec_pubkey_negate",ctx, pk);
    return 0;
}
//Provides: caml_secp256k1_ec_pubkey_tweak_add
//Requires: call_wasm
function caml_secp256k1_ec_pubkey_tweak_add(ctx, pk, tweak) {
    return call_wasm("_secp256k1_ec_pubkey_tweak_add",
		     ctx,
		     pk,
		     tweak) ? 1 : 0
}
//Provides: caml_secp256k1_ec_pubkey_tweak_mul
//Requires: call_wasm
function caml_secp256k1_ec_pubkey_tweak_mul(ctx, pk, tweak) {
    return call_wasm("_secp256k1_ec_pubkey_tweak_mul",
		      ctx,
		     pk,
		     tweak) ? 1 : 0
}
//Provides: caml_secp256k1_ec_pubkey_combine
//Requires: call_wasm, secp256k1_wasm_allocate, secp256k1_wasm_free, wasm_ints_pointer
function caml_secp256k1_ec_pubkey_combine(ctx, out, pks) {
    var apks = [];
    while(pks) {
	apks.push(secp256k1_wasm_allocate(pks[1]));
	pks = pks[2]
    }
    var cpks = wasm_ints_pointer(apks);
    var res = call_wasm("_secp256k1_ec_pubkey_combine",
			ctx,
			out,
			cpks,
			cpks.length);
    for(var i = 0; i < cpks.length; i++){
	secp256k1_wasm_free(cpks[i]);
    }
    return res
}
//Provides: caml_secp256k1_ecdsa_signature_parse_compact
//Requires: call_wasm
function caml_secp256k1_ecdsa_signature_parse_compact (ctx, buf, sig) {
    return call_wasm("_secp256k1_ecdsa_signature_parse_compact",
		      ctx,
		      buf,
		      sig) ? 1 : 0
}
//Provides: caml_secp256k1_ecdsa_signature_parse_der 
//Requires: call_wasm
function caml_secp256k1_ecdsa_signature_parse_der (ctx, buf, sig) {
    var sig_len = sig.data.length;
    var r = call_wasm("_secp256k1_ecdsa_signature_parse_der",
		      ctx,
		      buf,
		      sig,
		      sig_len);
    return r ? 1 : 0;
}
//Provides: caml_secp256k1_ecdsa_signature_normalize
//Requires: call_wasm
function caml_secp256k1_ecdsa_signature_normalize(ctx, buf, sig) {
    return call_wasm("_secp256k1_ecdsa_signature_normalize",
		      ctx,
                      buf,
                      sig) ? 1 : 0;
}
//Provides: caml_secp256k1_ecdsa_verify
//Requires: call_wasm
function caml_secp256k1_ecdsa_verify (ctx, pubkey, msg, signature) {
    return call_wasm("_secp256k1_ecdsa_verify",
		     ctx,
                     signature,
                     msg,
                     pubkey) ? 1 : 0;
}

//Provides: caml_secp256k1_ecdsa_sign
//Requires: call_wasm
function caml_secp256k1_ecdsa_sign (ctx, buf, seckey, msg) {
    return call_wasm("_secp256k1_ecdsa_sign",
		     ctx,
                     buf,
                     msg,
                     seckey,
                     null, null) ? 1 : 0;
}
//Provides: caml_secp256k1_ecdsa_signature_serialize_der
//Requires: call_wasm, wasm_int_pointer
function caml_secp256k1_ecdsa_signature_serialize_der(ctx, buf, signature) {
    var size = buf.dims[0];
    var size_ba = wasm_int_pointer(size);
    var ret = call_wasm("_secp256k1_ecdsa_signature_serialize_der",
			ctx,
			buf,
			size_ba,
			signature);
    return (ret == 0 ? ret : size_ba.data[0]);
}
//Provides: caml_secp256k1_ecdsa_signature_serialize_compact
//Requires: call_wasm
function caml_secp256k1_ecdsa_signature_serialize_compact(ctx, buf, signature) {
    call_wasm("_secp256k1_ecdsa_signature_serialize_compact",
	       ctx,
               buf,
               signature);
    return 0;
}
//Provides: caml_secp256k1_ecdsa_recoverable_signature_parse_compact
//Requires: call_wasm
function caml_secp256k1_ecdsa_recoverable_signature_parse_compact (ctx, buf, signature, recid) {
    return call_wasm("_secp256k1_ecdsa_recoverable_signature_parse_compact",
		     ctx,
		     buf,
		     signature,
		     recid) ? 1 : 0;
}
//Provides: caml_secp256k1_ecdsa_sign_recoverable
//Requires: call_wasm
function caml_secp256k1_ecdsa_sign_recoverable (ctx, buf, seckey, msg) {
    return call_wasm("_secp256k1_ecdsa_sign_recoverable",
		     ctx,
                     buf,
                     msg,
                     seckey,
                     null, null) ? 1 : 0;
}
//Provides: caml_secp256k1_ecdsa_recoverable_signature_serialize_compact
//Requires: call_wasm, wasm_int_pointer
function caml_secp256k1_ecdsa_recoverable_signature_serialize_compact(ctx, buf, signature) {
    var recid_ba = wasm_int_pointer(0)

    call_wasm("_secp256k1_ecdsa_recoverable_signature_serialize_compact",
	      ctx,
              buf,
              recid_ba,
              signature);
    return recid_ba.data[0];
}
//Provides: caml_secp256k1_ecdsa_recoverable_signature_convert
//Requires: call_wasm
function caml_secp256k1_ecdsa_recoverable_signature_convert(ctx, buf, signature) {
    call_wasm("_secp256k1_ecdsa_recoverable_signature_convert",
	       ctx,
               buf,
               signature);
    return 0;
}
//Provides: caml_secp256k1_ecdsa_recover
//Requires:call_wasm
function caml_secp256k1_ecdsa_recover(ctx, buf, signature, msg) {
    return call_wasm("_secp256k1_ecdsa_recover",
		     ctx,
                     buf,
                     signature,
                     msg) ? 1 : 0;
}
