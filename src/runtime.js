//global: _SECP256K1

/*
   We assume that the _SECP256K1 Module is defined and loaded before these
   functions are called. In practice this means wrapping the generated
   js_of_ocaml runtime in a function and calling it after onRuntimeInitialize
   has occured.
*/

//const PUBLIC_KEY_SIZE = 64;
//const PRIVATE_KEY_SIZE = 32;
//const COMPRESSED_PUBLIC_KEY_SIZE = 33;
//const UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;
//const ECDSA_SIGNATURE_SIZE = 64;
//const RECOVERABLE_SIGNATURE_SIZE = 65;
//const COMPACT_SIGNATURE_SIZE = 64;
//const MAX_ECDSA_SIGNATURE_SIZE = 72;
//const SEED_SIZE = 32;

//Provides: sizeof_secp256k1_num
function sizeof_secp256k1_num() {
  return 72;
}

//Provides: ml_secp256k1_num_copy
//Requires: call_wasm
function ml_secp256k1_num_copy(r, a) {
  call_wasm("_secp256k1_num_copy", r, a);
  return 0;
}
//Provides: ml_secp256k1_num_get_bin
//Requires: call_wasm
function ml_secp256k1_num_get_bin(r, rlen, a) {
  call_wasm("_secp256k1_num_get_bin", r.data, rlen, a);
  return 0;
}
//Provides: ml_secp256k1_num_set_bin
//Requires: call_wasm
function ml_secp256k1_num_set_bin(r, a, alen) {
  call_wasm("_secp256k1_num_set_bin", r, a, alen);
  return 0;
}
//Provides: ml_secp256k1_num_mod_inverse
//Requires: call_wasm
function ml_secp256k1_num_mod_inverse(r, a, m) {
  call_wasm("_secp256k1_num_mod_inverse", r, a, m);
  return 0;
}

//Provides: ml_secp256k1_num_jacobi
//Requires: call_wasm
function ml_secp256k1_num_jacobi(a, b) {
  return call_wasm("_secp256k1_num_jacobi", a, b);
}

//Provides: ml_secp256k1_num_cmp
//Requires: call_wasm
function ml_secp256k1_num_cmp(a, b) {
  return call_wasm("_secp256k1_num_cmp", a, b);
}

//Provides: ml_secp256k1_num_eq
//Requires: call_wasm
function ml_secp256k1_num_eq(a, b) {
  return call_wasm("_secp256k1_num_eq", a, b) ? 1 : 0;
}

//Provides: ml_secp256k1_num_add
//Requires: call_wasm
function ml_secp256k1_num_add(r, a, b) {
  call_wasm("_secp256k1_num_add", r, a, b);
  return 0;
}

//Provides: ml_secp256k1_num_sub
//Requires: call_wasm
function ml_secp256k1_num_sub(r, a, b) {
  call_wasm("_secp256k1_num_sub", r, a, b);
  return 0;
}

//Provides: ml_secp256k1_num_mul
//Requires: call_wasm
function ml_secp256k1_num_mul(r, a, b) {
  call_wasm("_secp256k1_num_mul", r, a, b);
  return 0;
}

//Provides: ml_secp256k1_num_mod
//Requires: call_wasm
function ml_secp256k1_num_mod(r, m) {
  call_wasm("_secp256k1_num_mod", r, m);
  return 0;
}

//Provides: ml_secp256k1_num_shift
//Requires: call_wasm
function ml_secp256k1_num_shift(r, bits) {
  call_wasm("_secp256k1_num_shift", r, bits);
  return 0;
}

//Provides: ml_secp256k1_num_is_zero
//Requires: call_wasm
function ml_secp256k1_num_is_zero(a) {
  return call_wasm("_secp256k1_num_is_zero", a) ? 1 : 0;
}

//Provides: ml_secp256k1_num_is_one
//Requires: call_wasm
function ml_secp256k1_num_is_one(a) {
  return call_wasm("_secp256k1_num_is_one", a) ? 1 : 0;
}

//Provides: ml_secp256k1_num_is_neg
//Requires: call_wasm
function ml_secp256k1_num_is_neg(a) {
  return call_wasm("_secp256k1_num_is_neg", a) ? 1 : 0;
}

//Provides: ml_secp256k1_num_negate
//Requires: call_wasm
function ml_secp256k1_num_negate(r) {
  call_wasm("_secp256k1_num_negate", r);
  return 0;
}

//Provides: ml_secp256k1_scalar_const
//Requires: call_wasm
function ml_secp256k1_scalar_const(r, d7, d6, d5, d4, d3, d2, d1, d0) {
  call_wasm("_secp256k1_scalar_const", r, d7, d6, d5, d4, d3, d2, d1, d0);
  return 0;
}

//Provides: ml_secp256k1_scalar_const_bytecode
//Requires: call_wasm
function ml_secp256k1_scalar_const_bytecode(r, d7, d6, d5, d4, d3, d2, d1, d0) {
  call_wasm("_secp256k1_scalar_const", r, d7, d6, d5, d4, d3, d2, d1, d0);
  return 0;
}

//Provides: ml_secp256k1_scalar_clear
//Requires: call_wasm
function ml_secp256k1_scalar_clear(r) {
  call_wasm("_secp256k1_scalar_clear", r);
  return 0;
}
//Provides: ml_secp256k1_scalar_get_bits
//Requires: call_wasm
function ml_secp256k1_scalar_get_bits(a, offset, count) {
  return call_wasm("_secp256k1_scalar_get_bits", a, offset, count);
}

//Provides: ml_secp256k1_scalar_get_bits_var
//Requires: call_wasm
function ml_secp256k1_scalar_get_bits_var(a, offset, count) {
  return call_wasm("_secp256k1_scalar_get_bits_var", a, offset, count);
}

//Provides: ml_secp256k1_scalar_set_b32
//Requires: call_wasm, wasm_int_pointer
function ml_secp256k1_scalar_set_b32(r, bin) {
  var overflow_ba = wasm_int_pointer(0);
  call_wasm("_secp256k1_scalar_set_b32", r, bin, overflow_ba);
  return overflow_ba.data[0] ? 1 : 0;
}

//Provides: ml_secp256k1_scalar_set_int
//Requires: call_wasm
function ml_secp256k1_scalar_set_int(r, v) {
  call_wasm("_secp256k1_scalar_set_int", r, v);
  return 0;
}

//Provides: ml_secp256k1_scalar_get_b32
//Requires: call_wasm
function ml_secp256k1_scalar_get_b32(bin, a) {
  call_wasm("_secp256k1_scalar_get_b32", bin.datra, a);
  return 0;
}

//Provides: ml_secp256k1_scalar_add
//Requires: call_wasm
function ml_secp256k1_scalar_add(r, a, b) {
  return call_wasm("_secp256k1_scalar_add", r, a, b);
}

//Provides: ml_secp256k1_scalar_cadd_bit
//Requires: call_wasm
function ml_secp256k1_scalar_cadd_bit(r, bit, flag) {
  call_wasm("_secp256k1_scalar_cadd_bit", r, bit, !!flag);
  return 0;
}

//Provides: ml_secp256k1_scalar_mul
//Requires: call_wasm
function ml_secp256k1_scalar_mul(r, a, b) {
  call_wasm("_secp256k1_scalar_mul", r, a, b);
  return 0;
}

//Provides: ml_secp256k1_scalar_shr_int
//Requires: call_wasm
function ml_secp256k1_scalar_shr_int(r, n) {
  return call_wasm("_secp256k1_scalar_shr_int", r, n);
}

//Provides: ml_secp256k1_scalar_sqr
//Requires: call_wasm
function ml_secp256k1_scalar_sqr(r, a) {
  call_wasm("_secp256k1_scalar_sqr", r, a);
  return 0;
}

//Provides: ml_secp256k1_scalar_inverse
//Requires: call_wasm
function ml_secp256k1_scalar_inverse(r, a) {
  call_wasm("_secp256k1_scalar_inverse", r, a);
  return 0;
}

//Provides: ml_secp256k1_scalar_inverse_var
//Requires: call_wasm
function ml_secp256k1_scalar_inverse_var(r, a) {
  call_wasm("_secp256k1_scalar_inverse_var", r, a);
  return 0;
}

//Provides: ml_secp256k1_scalar_negate
//Requires: call_wasm
function ml_secp256k1_scalar_negate(r, a) {
  call_wasm("_secp256k1_scalar_negate", r, a);
  return 0;
}

//Provides: ml_secp256k1_scalar_is_zero
//Requires: call_wasm
function ml_secp256k1_scalar_is_zero(r) {
  return call_wasm("_secp256k1_scalar_is_zero", r) ? 1 : 0;
}

//Provides: ml_secp256k1_scalar_is_one
//Requires: call_wasm
function ml_secp256k1_scalar_is_one(r) {
  return call_wasm("_secp256k1_scalar_is_one", r) ? 1 : 0;
}

//Provides: ml_secp256k1_scalar_is_even
//Requires: call_wasm
function ml_secp256k1_scalar_is_even(r) {
  return call_wasm("_secp256k1_scalar_is_even", r) ? 1 : 0;
}

//Provides: ml_secp256k1_scalar_is_high
//Requires: call_wasm
function ml_secp256k1_scalar_is_high(r) {
  return call_wasm("_secp256k1_scalar_is_high", r) ? 1 : 0;
}

//Provides: ml_secp256k1_scalar_cond_negate
//Requires: call_wasm
function ml_secp256k1_scalar_cond_negate(r, flag) {
  var ret = call_wasm("_secp256k1_scalar_cond_negate", r, !!flag);
  return ret == -1 ? 1 : 0;
}

//Provides: ml_secp256k1_scalar_get_num
//Requires: call_wasm
function ml_secp256k1_scalar_get_num(r, a) {
  call_wasm("_secp256k1_scalar_get_num", r, a);
  return 0;
}

//Provides: ml_secp256k1_scalar_order_get_num
//Requires: call_wasm
function ml_secp256k1_scalar_order_get_num(r) {
  call_wasm("_secp256k1_scalar_order_get_num", r);
  return 0;
}

//Provides: ml_secp256k1_scalar_eq
//Requires: call_wasm
function ml_secp256k1_scalar_eq(a, b) {
  return call_wasm("_secp256k1_scalar_eq", a, b) ? 1 : 0;
}

//Provides: ml_secp256k1_mul_shift_var
//Requires: call_wasm
function ml_secp256k1_mul_shift_var(r, a, b, shift) {
  call_wasm("_secp256k1_scalar_mul_shift_var", r, a, b, shift);
  return 0;
}
//Provides: ml_secp256k1_fe_const_bytecode
//Requires: call_wasm
function ml_secp256k1_fe_const_bytecode(r, d7, d6, d5, d4, d3, d2, d1, d0) {
  call_wasm("_secp256k1_fe_const", r, d7, d6, d5, d4, d3, d2, d1, d0);
  return 0;
}
//Provides: ml_secp256k1_fe_storage_const_bytecode
//Requires: call_wasm
function ml_secp256k1_fe_storage_const_bytecode(
  r,
  d7,
  d6,
  d5,
  d4,
  d3,
  d2,
  d1,
  d0
) {
  call_wasm("_secp256k1_fe_storage_const", r, d7, d6, d5, d4, d3, d2, d1, d0);
  return 0;
}

//Provides: ml_secp256k1_fe_normalize
//Requires: call_wasm
function ml_secp256k1_fe_normalize(r) {
  call_wasm("_secp256k1_fe_normalize", r);
  return 0;
}

//Provides: ml_secp256k1_fe_normalize_weak
//Requires: call_wasm
function ml_secp256k1_fe_normalize_weak(r) {
  call_wasm("_secp256k1_fe_normalize_weak", r);
  return 0;
}

//Provides: ml_secp256k1_fe_normalize_var
//Requires: call_wasm
function ml_secp256k1_fe_normalize_var(r) {
  call_wasm("_secp256k1_fe_normalize_var", r);
  return 0;
}

//Provides: ml_secp256k1_fe_normalizes_to_zero
//Requires: call_wasm
function ml_secp256k1_fe_normalizes_to_zero(r) {
  return call_wasm("_secp256k1_fe_normalizes_to_zero", r) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_normalizes_to_zero_var
//Requires: call_wasm
function ml_secp256k1_fe_normalizes_to_zero_var(r) {
  return call_wasm("_secp256k1_fe_normalizes_to_zero_var", r) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_set_int
//Requires: call_wasm
function ml_secp256k1_fe_set_int(r, a) {
  call_wasm("_secp256k1_fe_set_int", r, a);
  return 0;
}

//Provides: ml_secp256k1_fe_clear
//Requires: call_wasm
function ml_secp256k1_fe_clear(r) {
  call_wasm("_secp256k1_fe_clear", r);
  return 0;
}

//Provides: ml_secp256k1_fe_is_zero
//Requires: call_wasm
function ml_secp256k1_fe_is_zero(r) {
  return call_wasm("_secp256k1_fe_is_zero", r) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_is_odd
//Requires: call_wasm
function ml_secp256k1_fe_is_odd(r) {
  return call_wasm("_secp256k1_fe_is_odd", r) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_equal
//Requires: call_wasm
function ml_secp256k1_fe_equal(a, b) {
  return call_wasm("_secp256k1_fe_equal", a, b) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_equal_var
//Requires: call_wasm
function ml_secp256k1_fe_equal_var(a, b) {
  return call_wasm("_secp256k1_fe_equal_var", a, b) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_cmp_var
//Requires: call_wasm
function ml_secp256k1_fe_cmp_var(a, b) {
  return call_wasm("_secp256k1_fe_cmp_var", a, b);
}

//Provides: ml_secp256k1_fe_set_b32
//Requires: call_wasm
function ml_secp256k1_fe_set_b32(r, a) {
  return call_wasm("_secp256k1_fe_set_b32", r, a) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_get_b32
//Requires: call_wasm
function ml_secp256k1_fe_get_b32(a, r) {
  call_wasm("_secp256k1_fe_get_b32", a, r);
  return 0;
}

//Provides: ml_secp256k1_fe_negate
//Requires: call_wasm
function ml_secp256k1_fe_negate(r, a, m) {
  call_wasm("_secp256k1_fe_negate", r, a, m);
  return 0;
}

//Provides: ml_secp256k1_fe_mul_int
//Requires: call_wasm
function ml_secp256k1_fe_mul_int(r, a) {
  call_wasm("_secp256k1_fe_mul_int", r, a);
  return 0;
}

//Provides: ml_secp256k1_fe_add
//Requires: call_wasm
function ml_secp256k1_fe_add(r, a) {
  call_wasm("_secp256k1_fe_add", r, a);
  return 0;
}

//Provides: ml_secp256k1_fe_mul
//Requires: call_wasm
function ml_secp256k1_fe_mul(r, a, b) {
  call_wasm("_secp256k1_fe_mul", r, a, b);
  return 0;
}

//Provides: ml_secp256k1_fe_sqr
//Requires: call_wasm
function ml_secp256k1_fe_sqr(r, a) {
  call_wasm("_secp256k1_fe_sqr", r, a);
  return 0;
}

//Provides: ml_secp256k1_fe_sqrt
//Requires: call_wasm
function ml_secp256k1_fe_sqrt(r, a) {
  return call_wasm("_secp256k1_fe_sqrt", r, a) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_is_quad_var
//Requires: call_wasm
function ml_secp256k1_fe_is_quad_var(r) {
  return call_wasm("_secp256k1_fe_is_quad_var", r) ? 1 : 0;
}

//Provides: ml_secp256k1_fe_inv
//Requires: call_wasm
function ml_secp256k1_fe_inv(r, a) {
  call_wasm("_secp256k1_fe_inv", r, a);
  return 0;
}

//Provides: ml_secp256k1_fe_inv_var
//Requires: call_wasm
function ml_secp256k1_fe_inv_var(r, a) {
  call_wasm("_secp256k1_fe_inv_var", r, a);
  return 0;
}

//Provides: ml_secp256k1_fe_inv_all_var
//Requires: call_wasm
function ml_secp256k1_fe_inv_all_var(r, a, len) {
  call_wasm("_secp256k1_fe_inv_all_var", r, a, len);
  return 0;
}

//Provides: ml_secp256k1_fe_to_storage
//Requires: call_wasm
function ml_secp256k1_fe_to_storage(r, a) {
  call_wasm("_secp256k1_fe_to_storage", r, a);
  return 0;
}

//Provides: ml_secp256k1_fe_from_storage
//Requires: call_wasm
function ml_secp256k1_fe_from_storage(r, a) {
  call_wasm("_secp256k1_fe_from_storage", r, a);
  return 0;
}

//Provides: ml_secp256k1_fe_storage_cmov
//Requires: call_wasm
function ml_secp256k1_fe_storage_cmov(r, a, flag) {
  call_wasm("_secp256k1_fe_storage_cmov", r, a, !!flag);
  return 0;
}

//Provides: ml_secp256k1_fe_cmov
//Requires: call_wasm
function ml_secp256k1_fe_cmov(r, a, flag) {
  call_wasm("_secp256k1_fe_cmov", r, a, !!flag);
  return 0;
}

//Provides: ml_secp256k1_ge_of_fields
//Requires: call_wasm
function ml_secp256k1_ge_of_fields(r, x, y, infinity) {
  call_wasm("_secp256k1_ge_of_fields", r, x, y, !!infinity);
  return 0;
}

//Provides: ml_secp256k1_gej_of_fields
//Requires: call_wasm
function ml_secp256k1_gej_of_fields(r, x, y, z, infinity) {
  call_wasm("_secp256k1_gej_of_fields", r, x, y, z, !!infinity);
  return 0;
}

//Provides: ml_secp256k1_ge_storage_of_fields
//Requires: call_wasm
function ml_secp256k1_ge_storage_of_fields(r, x, y) {
  call_wasm("_secp256k1_ge_storage_of_fields", r, x, y);
  return 0;
}

//Provides: ml_secp256k1_ge_set_xy
//Requires: call_wasm
function ml_secp256k1_ge_set_xy(r, x, y) {
  call_wasm("_secp256k1_ge_set_xy", r, x, y);
  return 0;
}

//Provides: ml_secp256k1_ge_set_xquad
//Requires: call_wasm
function ml_secp256k1_ge_set_xquad(r, x) {
  return call_wasm("_secp256k1_ge_set_xquad", r, x) ? 1 : 0;
}

//Provides: ml_secp256k1_ge_set_xo_var
//Requires: call_wasm
function ml_secp256k1_ge_set_xo_var(r, x, odd) {
  return call_wasm("_secp256k1_ge_set_xo_var", r, x, odd) ? 1 : 0;
}

//Provides: ml_secp256k1_ge_is_infinity
//Requires: call_wasm
function ml_secp256k1_ge_is_infinity(a) {
  return call_wasm("_secp256k1_ge_is_infinity", a) ? 1 : 0;
}

//Provides: ml_secp256k1_ge_is_valid_var
//Requires: call_wasm
function ml_secp256k1_ge_is_valid_var(a) {
  return call_wasm("_secp256k1_ge_is_valid_var", a) ? 1 : 0;
}

//Provides: ml_secp256k1_ge_neg
//Requires: call_wasm
function ml_secp256k1_ge_neg(r, a) {
  call_wasm("_secp256k1_ge_neg", r, a);
  return 0;
}

//Provides: ml_secp256k1_ge_set_gej
//Requires: call_wasm
function ml_secp256k1_ge_set_gej(r, a) {
  call_wasm("_secp256k1_ge_set_gej", r, a);
  return 0;
}

//Provides: ml_secp256k1_gej_set_infinity
//Requires: call_wasm
function ml_secp256k1_gej_set_infinity(r) {
  call_wasm("_secp256k1_gej_set_infinity", r);
  return 0;
}

//Provides: ml_secp256k1_gej_set_ge
//Requires: call_wasm
function ml_secp256k1_gej_set_ge(r, a) {
  call_wasm("_secp256k1_gej_set_ge", r, a);
  return 0;
}

//Provides: ml_secp256k1_gej_eq_x_var
//Requires: call_wasm
function ml_secp256k1_gej_eq_x_var(x, a) {
  return call_wasm("_secp256k1_gej_eq_x_var", x, a);
}

//Provides: ml_secp256k1_gej_neg
//Requires: call_wasm
function ml_secp256k1_gej_neg(r, a) {
  call_wasm("_secp256k1_gej_neg", r, a);
  return 0;
}

//Provides: ml_secp256k1_gej_is_infinity
//Requires: call_wasm
function ml_secp256k1_gej_is_infinity(a) {
  return call_wasm("_secp256k1_gej_is_infinity", a) ? 1 : 0;
}

//Provides: ml_secp256k1_gej_has_quad_y_var
//Requires: call_wasm
function ml_secp256k1_gej_has_quad_y_var(a) {
  return call_wasm("_secp256k1_gej_has_quad_y_var", a) ? 1 : 0;
}

//Provides: ml_secp256k1_gej_double_nonzero
//Requires: call_wasm
function ml_secp256k1_gej_double_nonzero(r, a, rzr) {
  call_wasm("_secp256k1_gej_double_nonzero", r, a, rzr == 0 ? null : rzr[1]);
  return 0;
}

//Provides: ml_secp256k1_gej_double_var
//Requires: call_wasm
function ml_secp256k1_gej_double_var(r, a, rzr) {
  call_wasm("_secp256k1_gej_double_var", r, a, rzr == 0 ? null : rzr[1]);
  return 0;
}

//Provides: ml_secp256k1_gej_add_var
//Requires: call_wasm
function ml_secp256k1_gej_add_var(r, a, b, rzr) {
  call_wasm("_secp256k1_gej_add_var", r, a, b, rzr == 0 ? null : rzr[1]);
  return 0;
}

//Provides: ml_secp256k1_gej_add_ge
//Requires: call_wasm
function ml_secp256k1_gej_add_ge(r, a, b) {
  call_wasm("_secp256k1_gej_add_ge", r, a, b);
  return 0;
}

//Provides: ml_secp256k1_gej_add_ge_var
//Requires: call_wasm
function ml_secp256k1_gej_add_ge_var(r, a, b, rzr) {
  call_wasm("_secp256k1_gej_add_ge_var", r, a, b, rzr == 0 ? null : rzr[1]);
  return 0;
}

//Provides: ml_secp256k1_gej_add_zinv_var
//Requires: call_wasm
function ml_secp256k1_gej_add_zinv_var(r, a, b, bzinv) {
  call_wasm("_secp256k1_gej_add_ge_var", r, a, b, bzinv);
  return 0;
}

//Provides: ml_secp256k1_gej_clear
//Requires: call_wasm
function ml_secp256k1_gej_clear(a) {
  call_wasm("_secp256k1_gej_clear", a);
  return 0;
}

//Provides: ml_secp256k1_ge_clear
//Requires: call_wasm
function ml_secp256k1_ge_clear(a) {
  call_wasm("_secp256k1_ge_clear", a);
  return 0;
}

//Provides: ml_secp256k1_ge_to_storage
//Requires: call_wasm
function ml_secp256k1_ge_to_storage(r, a) {
  call_wasm("_secp256k1_ge_to_storage", r, a);
  return 0;
}

//Provides: ml_secp256k1_ge_from_storage
//Requires: call_wasm
function ml_secp256k1_ge_from_storage(r, a) {
  call_wasm("_secp256k1_ge_from_storage", r, a);
  return 0;
}

//Provides: ml_secp256k1_ge_storage_cmov
//Requires: call_wasm
function ml_secp256k1_ge_storage_cmov(r, a, flag) {
  call_wasm("_secp256k1_ge_storage_cmov", r, a, !!flag);
  return 0;
}

//Provides: ml_secp256k1_gej_rescale
//Requires: call_wasm
function ml_secp256k1_gej_rescale(r, b) {
  call_wasm("_secp256k1_gej_rescale", r, b);
  return 0;
}

//Provides: ml_secp256k1_ecmult_const
//Requires: call_wasm
function ml_secp256k1_ecmult_const(r, a, q) {
  call_wasm("_secp256k1_ecmult_const", r, a, q.data.offset);
  return 0;
}

//Provides: ml_secp256k1_eckey_pubkey_parse
//Requires: call_wasm
function ml_secp256k1_eckey_pubkey_parse(elem, pub, size) {
  return call_wasm("_secp256k1_eckey_pubkey_parse", elem, pub, size) ? 1 : 0;
}

//Provides: ml_secp256k1_eckey_pubkey_serialize
//Requires: call_wasm, wasm_int_pointer
function ml_secp256k1_eckey_pubkey_serialize(elem, pub, size, compressed) {
  var size_ba = wasm_int_pointer(size);
  var r = call_wasm(
    "_secp256k1_eckey_pubkey_serialize",
    elem,
    pub,
    size_ba,
    !!compressed
  );
  if (r) return size_ba.data[0];
  return 0;
}
