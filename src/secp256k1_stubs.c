/* START OF CUSTOM CODE */

#include <string.h>
#include <caml/mlvalues.h>
#include <caml/bigarray.h>

int secp256k1_sizeof_secp256k1_num() { return sizeof(secp256k1_num); }

CAMLprim value sizeof_secp256k1_num(value unit) {
    return Val_int(secp256k1_sizeof_secp256k1_num());
}

CAMLprim value ml_secp256k1_num_copy(value r, value a) {
    secp256k1_num_copy(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_get_bin(value r, value rlen, value a) {
    secp256k1_num_get_bin(Caml_ba_data_val(r), Int_val(rlen), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_set_bin(value r, value a, value alen) {
    secp256k1_num_set_bin(Caml_ba_data_val(r), Caml_ba_data_val(a), Int_val(alen));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_mod_inverse(value r, value a, value m) {
    secp256k1_num_mod_inverse(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(m));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_jacobi(value a, value b) {
    return Val_int(secp256k1_num_jacobi(Caml_ba_data_val(a), Caml_ba_data_val(b)));
}

CAMLprim value ml_secp256k1_num_cmp(value a, value b) {
    return Val_int(secp256k1_num_cmp(Caml_ba_data_val(a), Caml_ba_data_val(b)));
}

CAMLprim value ml_secp256k1_num_eq(value a, value b) {
    return Val_bool(secp256k1_num_eq(Caml_ba_data_val(a), Caml_ba_data_val(b)));
}

CAMLprim value ml_secp256k1_num_add(value r, value a, value b) {
    secp256k1_num_add(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_sub(value r, value a, value b) {
    secp256k1_num_sub(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_mul(value r, value a, value b) {
    secp256k1_num_mul(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_mod(value r, value m) {
    secp256k1_num_mod(Caml_ba_data_val(r), Caml_ba_data_val(m));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_shift(value r, value bits) {
    secp256k1_num_shift(Caml_ba_data_val(r), Int_val(bits));
    return Val_unit;
}

CAMLprim value ml_secp256k1_num_is_zero(value a) {
    return Val_bool(secp256k1_num_is_zero(Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_num_is_one(value a) {
    return Val_bool(secp256k1_num_is_one(Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_num_is_neg(value a) {
    return Val_bool(secp256k1_num_is_neg(Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_num_negate(value r) {
    secp256k1_num_negate(Caml_ba_data_val(r));
    return Val_unit;
}

void secp256k1_scalar_const(secp256k1_scalar *r, uint32_t d7, uint32_t d6,
                            uint32_t d5, uint32_t d4, uint32_t d3, uint32_t d2,
                            uint32_t d1, uint32_t d0) {
  secp256k1_scalar s = SECP256K1_SCALAR_CONST(d7, d6, d5, d4, d3, d2, d1, d0);
  memcpy(r, &s, sizeof(secp256k1_scalar));
  return;
}

CAMLprim value ml_secp256k1_scalar_const(value r, value d7, value d6, value d5,
                                         value d4, value d3, value d2, value d1,
                                         value d0) {
  secp256k1_scalar_const(Caml_ba_data_val(r), Int32_val(d7), Int32_val(d6),
                         Int32_val(d5), Int32_val(d4), Int32_val(d3),
                         Int32_val(d2), Int32_val(d1), Int32_val(d0));
  return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_const_bytecode (value * argv, int argn)
{
    return ml_secp256k1_scalar_const(argv[0], argv[1], argv[2], argv[3],
                                     argv[4], argv[5], argv[6], argv[7],
                                     argv[8]);
}

CAMLprim value ml_secp256k1_scalar_clear(value r) {
    secp256k1_scalar_clear(Caml_ba_data_val(r));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_get_bits(value a, value offset, value count) {
    return Val_int(secp256k1_scalar_get_bits(Caml_ba_data_val(a), Int_val(offset), Int_val(count)));
}

CAMLprim value ml_secp256k1_scalar_get_bits_var(value a, value offset, value count) {
    return Val_int(secp256k1_scalar_get_bits_var(Caml_ba_data_val(a), Int_val(offset), Int_val(count)));
}

CAMLprim value ml_secp256k1_scalar_set_b32(value r, value bin) {
    int overflow;
    secp256k1_scalar_set_b32(Caml_ba_data_val(r), Caml_ba_data_val(bin), &overflow);
    return Val_bool(overflow);
}

CAMLprim value ml_secp256k1_scalar_set_int(value r, value v) {
    secp256k1_scalar_set_int(Caml_ba_data_val(r), Int_val(v));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_get_b32(value bin, value a) {
    secp256k1_scalar_get_b32(Caml_ba_data_val(bin), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_add(value r, value a, value b) {
    return Val_int(secp256k1_scalar_add(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b)));
}

CAMLprim value ml_secp256k1_scalar_cadd_bit(value r, value bit, value flag) {
    secp256k1_scalar_cadd_bit(Caml_ba_data_val(r), Int_val(bit), Bool_val(flag));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_mul(value r, value a, value b) {
    secp256k1_scalar_mul(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_shr_int(value r, value n) {
    return Val_int(secp256k1_scalar_shr_int(Caml_ba_data_val(r), Int_val(n)));
}

CAMLprim value ml_secp256k1_scalar_sqr(value r, value a) {
    secp256k1_scalar_sqr(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_inverse(value r, value a) {
    secp256k1_scalar_inverse(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_inverse_var(value r, value a) {
    secp256k1_scalar_inverse_var(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_negate(value r, value a) {
    secp256k1_scalar_negate(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_is_zero(value r) {
    return Val_bool(secp256k1_scalar_is_zero(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_scalar_is_one(value r) {
    return Val_bool(secp256k1_scalar_is_one(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_scalar_is_even(value r) {
    return Val_bool(secp256k1_scalar_is_even(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_scalar_is_high(value r) {
    return Val_bool(secp256k1_scalar_is_high(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_scalar_cond_negate(value r, value flag) {
    int ret = secp256k1_scalar_cond_negate(Caml_ba_data_val(r), Bool_val(flag));
    return (ret == -1 ? Val_true : Val_false);
}

CAMLprim value ml_secp256k1_scalar_get_num(value r, value a) {
    secp256k1_scalar_get_num(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_order_get_num(value r) {
    secp256k1_scalar_order_get_num(Caml_ba_data_val(r));
    return Val_unit;
}

CAMLprim value ml_secp256k1_scalar_eq(value a, value b) {
    return Val_bool(secp256k1_scalar_eq(Caml_ba_data_val(a), Caml_ba_data_val(b)));
}

CAMLprim value ml_secp256k1_mul_shift_var(value r, value a, value b, value shift) {
    secp256k1_scalar_mul_shift_var(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b), Int_val(shift));
    return Val_unit;
}

void secp256k1_fe_const(secp256k1_fe *r, uint32_t d7, uint32_t d6, uint32_t d5,
                        uint32_t d4, uint32_t d3, uint32_t d2, uint32_t d1,
                        uint32_t d0) {
  secp256k1_fe fe = SECP256K1_FE_CONST(d7, d6, d5, d4, d3, d2, d1, d0);
  memcpy(r, &fe, sizeof(secp256k1_fe));
  return;
}

CAMLprim value ml_secp256k1_fe_const(value r, value d7, value d6, value d5,
                                     value d4, value d3, value d2, value d1,
                                     value d0) {
  secp256k1_fe_const(Caml_ba_data_val(r), Int32_val(d7), Int32_val(d6),
                     Int32_val(d5), Int32_val(d4), Int32_val(d3), Int32_val(d2),
                     Int32_val(d1), Int32_val(d0));
  return Val_unit;
}

CAMLprim value ml_secp256k1_fe_const_bytecode (value * argv, int argn)
{
    return ml_secp256k1_fe_const(argv[0], argv[1], argv[2], argv[3],
                                 argv[4], argv[5], argv[6], argv[7],
                                 argv[8]);
}

void secp256k1_ge_of_fields(secp256k1_ge *r, secp256k1_fe *x, secp256k1_fe *y,
                            int infinity) {
  secp256k1_ge *g = r;
  memcpy(&g->x, x, sizeof(secp256k1_fe));
  memcpy(&g->y, y, sizeof(secp256k1_fe));
  g->infinity = Bool_val(infinity);
  return;
}

void secp256k1_fe_storage_const (secp256k1_fe_storage *r,
				 uint32_t d7, uint32_t d6, uint32_t d5, uint32_t d4,
				 uint32_t d3, uint32_t d2, uint32_t d1, uint32_t d0) {
    secp256k1_fe_storage fes = SECP256K1_FE_STORAGE_CONST(d7, d6, d5, d4, d3, d2, d1, d0);
    memcpy(r, &fes, sizeof(secp256k1_fe_storage));
    return;
}

CAMLprim value ml_secp256k1_fe_storage_const (value r,
                                              value d7, value d6, value d5, value d4,
                                              value d3, value d2, value d1, value d0) {
  secp256k1_fe_storage_const(Caml_ba_data_val(r),
			     Int32_val(d7), Int32_val(d6), Int32_val(d5), Int32_val(d4),
			     Int32_val(d3), Int32_val(d2), Int32_val(d1), Int32_val(d0));
  return Val_unit;
}

CAMLprim value ml_secp256k1_fe_storage_const_bytecode (value * argv, int argn)
{
    return ml_secp256k1_fe_storage_const(argv[0], argv[1], argv[2], argv[3],
                                         argv[4], argv[5], argv[6], argv[7],
                                         argv[8]);
}

CAMLprim value ml_secp256k1_fe_normalize(value r) {
    secp256k1_fe_normalize(Caml_ba_data_val(r));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_normalize_weak(value r) {
    secp256k1_fe_normalize_weak(Caml_ba_data_val(r));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_normalize_var(value r) {
    secp256k1_fe_normalize_var(Caml_ba_data_val(r));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_normalizes_to_zero(value r) {
    return Val_bool(secp256k1_fe_normalizes_to_zero(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_fe_normalizes_to_zero_var(value r) {
    return Val_bool(secp256k1_fe_normalizes_to_zero_var(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_fe_set_int(value r, value a) {
    secp256k1_fe_set_int(Caml_ba_data_val(r), Int_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_clear(value r) {
    secp256k1_fe_clear(Caml_ba_data_val(r));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_is_zero(value r) {
    return Val_bool(secp256k1_fe_is_zero(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_fe_is_odd(value r) {
    return Val_bool(secp256k1_fe_is_odd(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_fe_equal(value a, value b) {
    return Val_bool(secp256k1_fe_equal(Caml_ba_data_val(a), Caml_ba_data_val(b)));
}

CAMLprim value ml_secp256k1_fe_equal_var(value a, value b) {
    return Val_bool(secp256k1_fe_equal_var(Caml_ba_data_val(a), Caml_ba_data_val(b)));
}

CAMLprim value ml_secp256k1_fe_cmp_var(value a, value b) {
    return Val_int(secp256k1_fe_cmp_var(Caml_ba_data_val(a), Caml_ba_data_val(b)));
}

CAMLprim value ml_secp256k1_fe_set_b32(value r, value a) {
    return Val_bool(secp256k1_fe_set_b32(Caml_ba_data_val(r), Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_fe_get_b32(value a, value r) {
    secp256k1_fe_get_b32(Caml_ba_data_val(a), Caml_ba_data_val(r));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_negate(value r, value a, value m) {
    secp256k1_fe_negate(Caml_ba_data_val(r), Caml_ba_data_val(a), Int_val(m));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_mul_int(value r, value a) {
    secp256k1_fe_mul_int(Caml_ba_data_val(r), Int_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_add(value r, value a) {
    secp256k1_fe_add(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_mul(value r, value a, value b) {
    secp256k1_fe_mul(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_sqr(value r, value a) {
    secp256k1_fe_sqr(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_sqrt(value r, value a) {
    return Val_bool(secp256k1_fe_sqrt(Caml_ba_data_val(r), Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_fe_is_quad_var(value r) {
    return Val_bool(secp256k1_fe_is_quad_var(Caml_ba_data_val(r)));
}

CAMLprim value ml_secp256k1_fe_inv(value r, value a) {
    secp256k1_fe_inv(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_inv_var(value r, value a) {
    secp256k1_fe_inv_var(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_inv_all_var(value r, value a, value len) {
    secp256k1_fe_inv_all_var(Caml_ba_data_val(r), Caml_ba_data_val(a), Long_val(len));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_to_storage(value r, value a) {
    secp256k1_fe_to_storage(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_from_storage(value r, value a) {
    secp256k1_fe_from_storage(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_storage_cmov(value r, value a, value flag) {
    secp256k1_fe_storage_cmov(Caml_ba_data_val(r), Caml_ba_data_val(a), Bool_val(flag));
    return Val_unit;
}

CAMLprim value ml_secp256k1_fe_cmov(value r, value a, value flag) {
    secp256k1_fe_cmov(Caml_ba_data_val(r), Caml_ba_data_val(a), Bool_val(flag));
    return Val_unit;
}

CAMLprim value ml_secp256k1_ge_of_fields (value r, value x, value y, value infinity) {
    secp256k1_ge *g = Caml_ba_data_val(r);
    memcpy(&g->x, Caml_ba_data_val(x), sizeof(secp256k1_fe));
    memcpy(&g->y, Caml_ba_data_val(y), sizeof(secp256k1_fe));
    g->infinity = Bool_val(infinity);
    return Val_unit;
}

void secp256k1_gej_of_fields(secp256k1_gej *r, secp256k1_fe *x, secp256k1_fe *y,
                             secp256k1_fe *z, int infinity) {
  secp256k1_gej *g = r;
  memcpy(&g->x, x, sizeof(secp256k1_fe));
  memcpy(&g->y, y, sizeof(secp256k1_fe));
  memcpy(&g->z, z, sizeof(secp256k1_fe));
  g->infinity = infinity;
  return;
}

CAMLprim value ml_secp256k1_gej_of_fields (value r, value x, value y, value z, value infinity) {
   secp256k1_gej_of_fields(Caml_ba_data_val(r), Caml_ba_data_val(x),
                          Caml_ba_data_val(y), Caml_ba_data_val(z),
                          Bool_val(infinity));
    return Val_unit;
}

void secp256k1_ge_storage_of_fields (secp256k1_ge_storage *g, secp256k1_fe *x, secp256k1_fe *y) {
    memcpy(&g->x, x, sizeof(secp256k1_fe));
    memcpy(&g->y, y, sizeof(secp256k1_fe));
    return;
}


CAMLprim value ml_secp256k1_ge_storage_of_fields (value r, value x, value y) {
  secp256k1_ge_storage_of_fields (Caml_ba_data_val(r), Caml_ba_data_val(x), Caml_ba_data_val(y));
  return Val_unit;
}

CAMLprim value ml_secp256k1_ge_set_xy(value r, value x, value y) {
    secp256k1_ge_set_xy(Caml_ba_data_val(r), Caml_ba_data_val(x), Caml_ba_data_val(y));
    return Val_unit;
}

CAMLprim value ml_secp256k1_ge_set_xquad(value r, value x) {
    return Val_bool(secp256k1_ge_set_xquad(Caml_ba_data_val(r), Caml_ba_data_val(x)));
}

CAMLprim value ml_secp256k1_ge_set_xo_var(value r, value x, value odd) {
    return Val_bool(secp256k1_ge_set_xo_var(Caml_ba_data_val(r), Caml_ba_data_val(x), Int_val(odd)));
}

CAMLprim value ml_secp256k1_ge_is_infinity(value a) {
    return Val_bool(secp256k1_ge_is_infinity(Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_ge_is_valid_var(value a) {
    return Val_bool(secp256k1_ge_is_valid_var(Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_ge_neg(value r, value a) {
    secp256k1_ge_neg(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_ge_set_gej(value r, value a) {
    secp256k1_ge_set_gej(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_set_infinity(value r) {
    secp256k1_gej_set_infinity(Caml_ba_data_val(r));
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_set_ge(value r, value a) {
    secp256k1_gej_set_ge(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_eq_x_var(value x, value a) {
    return Val_int(secp256k1_gej_eq_x_var(Caml_ba_data_val(x), Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_gej_neg(value r, value a) {
    secp256k1_gej_neg(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_is_infinity(value a) {
    return Val_bool(secp256k1_gej_is_infinity(Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_gej_has_quad_y_var(value a) {
    return Val_bool(secp256k1_gej_has_quad_y_var(Caml_ba_data_val(a)));
}

CAMLprim value ml_secp256k1_gej_double_nonzero(value r, value a, value rzr) {
    secp256k1_gej_double_nonzero(Caml_ba_data_val(r), Caml_ba_data_val(a), Is_block(rzr) ? Caml_ba_data_val(Field(rzr, 0)) : NULL);
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_double_var(value r, value a, value rzr) {
    secp256k1_gej_double_var(Caml_ba_data_val(r), Caml_ba_data_val(a), Is_block(rzr) ? Caml_ba_data_val(Field(rzr, 0)) : NULL);
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_add_var(value r, value a, value b, value rzr) {
    secp256k1_gej_add_var(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b), Is_block(rzr) ? Caml_ba_data_val(Field(rzr, 0)) : NULL);
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_add_ge(value r, value a, value b) {
    secp256k1_gej_add_ge(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b));
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_add_ge_var(value r, value a, value b, value rzr) {
    secp256k1_gej_add_ge_var(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b), Is_block(rzr) ? Caml_ba_data_val(Field(rzr, 0)) : NULL);
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_add_zinv_var(value r, value a, value b, value bzinv) {
    secp256k1_gej_add_ge_var(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(b), Caml_ba_data_val(bzinv));
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_clear(value a) {
    secp256k1_gej_clear(Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_ge_clear(value a) {
    secp256k1_ge_clear(Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_ge_to_storage(value r, value a) {
    secp256k1_ge_to_storage(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_ge_from_storage(value r, value a) {
    secp256k1_ge_from_storage(Caml_ba_data_val(r), Caml_ba_data_val(a));
    return Val_unit;
}

CAMLprim value ml_secp256k1_ge_storage_cmov(value r, value a, value flag) {
    secp256k1_ge_storage_cmov(Caml_ba_data_val(r), Caml_ba_data_val(a), Bool_val(flag));
    return Val_unit;
}

CAMLprim value ml_secp256k1_gej_rescale(value r, value b) {
    secp256k1_gej_rescale(Caml_ba_data_val(r), Caml_ba_data_val(b));
    return Val_unit;
}

CAMLprim value ml_secp256k1_ecmult_const(value r, value a, value q) {
    secp256k1_ecmult_const(Caml_ba_data_val(r), Caml_ba_data_val(a), Caml_ba_data_val(q));
    return Val_unit;
}

CAMLprim value ml_secp256k1_eckey_pubkey_parse(value elem, value pub, value size) {
    return Val_bool(secp256k1_eckey_pubkey_parse(Caml_ba_data_val(elem), Caml_ba_data_val(pub), Long_val(size)));
}

CAMLprim value ml_secp256k1_eckey_pubkey_serialize(value elem, value pub, value size, value compressed) {
    size_t sz = Long_val(size);
    return (secp256k1_eckey_pubkey_serialize(Caml_ba_data_val(elem), Caml_ba_data_val(pub), &sz, Bool_val(compressed)) ? Val_long(sz) : Val_long(0));
}
