module Num : sig
  type t

  val zero : unit -> t

  val one : unit -> t

  val of_uint16 : int -> t

  val of_uint32 : int32 -> t

  val of_uint64 : int64 -> t

  (** Copy a number. *)
  val copy : t -> t -> unit

  (** Convert a number's absolute value to a binary big-endian string.
      There must be enough place. *)
  val get_bin : Cstruct.t -> t -> unit

  (** Set a number to the value of a binary big-endian string. *)
  val set_bin : t -> Cstruct.t -> unit

  (** [mod_inverse r a m] Compute a modular inverse. The input must be
      less than the modulus. *)
  val mod_inverse : t -> t -> t -> unit

  (** Compute the jacobi symbol (a|b). b must be positive and odd. *)
  val jacobi : t -> t -> int

  (** Compare the absolute value of two numbers. *)
  val compare : t -> t -> int

  (** Test whether two number are equal (including sign). *)
  val equal : t -> t -> bool

  (** [add r a b] Add two (signed) numbers. *)
  val add : t -> t -> t -> unit

  (** [sub r a b] Subtract two (signed) numbers. *)
  val sub : t -> t -> t -> unit

  (** [mul r a b] Multiply two (signed) numbers. *)
  val mul : t -> t -> t -> unit

  (** Replace a number by its remainder modulo m. M's sign is
      ignored. The result is a number between 0 and m-1, even if r was
      negative. *)
  val modulo : t -> t -> unit

  (** [shift t bits] Right-shift the passed number by [bits] bits. *)
  val shift : t -> int -> unit

  (** Check whether a number is zero. *)
  val is_zero : t -> bool

  (** Check whether a number is one. *)
  val is_one : t -> bool

  (** Check whether a number is strictly negative. *)
  val is_neg : t -> bool

  (** Change a number's sign. *)
  val negate : t -> unit
end

module Scalar : sig
  (** A scalar modulo the group order of the secp256k1 curve. *)
  type t

  val zero : unit -> t

  val one : unit -> t

  val copy : t -> t

  val const :
    ?d7:int32 ->
    ?d6:int32 ->
    ?d5:int32 ->
    ?d4:int32 ->
    ?d3:int32 ->
    ?d2:int32 ->
    ?d1:int32 ->
    ?d0:int32 ->
    unit ->
    t

  (** Clear a scalar to prevent the leak of sensitive data. *)
  val clear : t -> unit

  (** [get_bits a offset count] Access bits from a scalar. All
      requested bits must belong to the same 32-bit limb. *)
  val get_bits : t -> int -> int -> int

  (** [get_bits a offset count] Access bits from a scalar. Not
      constant time. *)
  val get_bits_var : t -> int -> int -> int

  (** Set a scalar from a big endian byte array. *)
  val set_b32 : t -> Cstruct.t -> bool

  (** Set a scalar to an unsigned integer. *)
  val set_int : t -> int -> unit

  (** Convert a scalar to a byte array. *)
  val get_b32 : Cstruct.t -> t -> unit

  (** [add r a b] Add two scalars together (modulo the group
      order). Returns whether it overflowed. *)
  val add : t -> t -> t -> bool

  (** [cadd_bit r bit flag] Conditionally add a power of two to a
      scalar. The result is not allowed to overflow. *)
  val cadd_bit : t -> int -> bool -> unit

  (** [mul r a b] Multiply two scalars (modulo the group order). *)
  val mul : t -> t -> t -> unit

  (** Shift a scalar right by some amount strictly between 0 and 16,
      returning the low bits that were shifted off *)
  val shr_int : t -> int -> int

  (** [sqr r a] Compute the square of a scalar (modulo the group
      order). *)
  val sqr : t -> t -> unit

  (** [inverse r a] Compute the inverse of a scalar (modulo the group
      order). *)
  val inverse : t -> t -> unit

  (** [inverse_var r a] Compute the inverse of a scalar (modulo the
      group order), without constant-time guarantee. *)
  val inverse_var : t -> t -> unit

  (** [negate r a] Compute the complement of a scalar (modulo the
      group order). *)
  val negate : t -> t -> unit

  (** Check whether a scalar equals zero. *)
  val is_zero : t -> bool

  (** Check whether a scalar equals one. *)
  val is_one : t -> bool

  (** Check whether a scalar, considered as an nonnegative integer, is
      even. *)
  val is_even : t -> bool

  (** Check whether a scalar is higher than the group order divided by
      2. *)
  val is_high : t -> bool

  (** Conditionally negate a number, in constant time. Returns [true]
      if the number was negated, [false] otherwise *)
  val cond_negate : t -> bool -> bool

  (** Convert a scalar to a number. *)
  val get_num : Num.t -> t -> unit

  (** Get the order of the group as a number. *)
  val order_get_num : Num.t -> unit

  (** Compare two scalars. *)
  val equal : t -> t -> bool

  (** Multiply a and b (without taking the modulus!), divide by
      2**shift, and round to the nearest integer. Shift must be at
      least 256. *)
  val mul_shift_var : t -> t -> t -> int -> unit
end

(** Field element module.
 *
 *  Field elements can be represented in several ways, but code accessing
 *  it (and implementations) need to take certain properties into account:
 *  - Each field element can be normalized or not.
 *  - Each field element has a magnitude, which represents how far away
 *    its representation is away from normalization. Normalized elements
 *    always have a magnitude of 1, but a magnitude of 1 doesn't imply
 *    normality. *)
module Field : sig
  type t

  module Storage : sig
    type t

    val size : int

    val of_cstruct : Cstruct.t -> t option

    val of_cstruct_exn : Cstruct.t -> t

    val to_cstruct : t -> Cstruct.t

    val const :
      ?d7:int32 ->
      ?d6:int32 ->
      ?d5:int32 ->
      ?d4:int32 ->
      ?d3:int32 ->
      ?d2:int32 ->
      ?d1:int32 ->
      ?d0:int32 ->
      unit ->
      t

    (** If flag is true, set *r equal to *a; otherwise leave
        it. Constant-time. *)
    val cmov : t -> t -> bool -> unit
  end

  (** Unpacks a constant into a overlapping multi-limbed FE
      element. *)
  val const :
    ?d7:int32 ->
    ?d6:int32 ->
    ?d5:int32 ->
    ?d4:int32 ->
    ?d3:int32 ->
    ?d2:int32 ->
    ?d1:int32 ->
    ?d0:int32 ->
    unit ->
    t

  (** Normalize a field element. *)
  val normalize : t -> unit

  (** Weakly normalize a field element: reduce it magnitude to 1, but
      don't fully normalize. *)
  val normalize_weak : t -> unit

  (** Normalize a field element, without constant-time guarantee. *)
  val normalize_var : t -> unit

  (** Verify whether a field element represents zero i.e. would
      normalize to a zero value. The field implementation may
      optionally normalize the input, but this should not be relied
      upon. *)
  val normalizes_to_zero : t -> bool

  (** Verify whether a field element represents zero i.e. would
      normalize to a zero value. The field implementation may
      optionally normalize the input, but this should not be relied
      upon. *)
  val normalizes_to_zero_var : t -> bool

  (** Set a field element equal to a small integer. Resulting field
      element is normalized. *)
  val set_int : t -> int -> unit

  (** Sets a field element equal to zero, initializing all fields. *)
  val clear : t -> unit

  (** Verify whether a field element is zero. Requires the input to be
      normalized. *)
  val is_zero : t -> bool

  (** Check the "oddness" of a field element. Requires the input to be
      normalized. *)
  val is_odd : t -> bool

  (** Compare two field elements. Requires magnitude-1 inputs. *)
  val equal : t -> t -> bool

  (** Same as secp256k1_fe_equal, but may be variable time. *)
  val equal_var : t -> t -> bool

  (** Compare two field elements. Requires both inputs to be
      normalized. *)
  val cmp_var : t -> t -> int

  (** Alias to [cmp_var]. *)
  val compare : t -> t -> int

  (** Set a field element equal to 32-byte big endian value. If
      successful, the resulting field element is normalized. *)
  val set_b32 : t -> Cstruct.t -> bool

  (** Convert a field element to a 32-byte big endian value. Requires
      the input to be normalized. *)
  val get_b32 : Cstruct.t -> t -> unit

  (** Set a field element equal to the additive inverse of
      another. Takes a maximum magnitude of the input as an
      argument. The magnitude of the output is one higher. *)
  val negate : t -> t -> int -> unit

  (** Multiplies the passed field element with a small integer
      constant. Multiplies the magnitude by that small integer. *)
  val mul_int : t -> int -> unit

  (** Adds a field element to another. The result has the sum of the
      inputs' magnitudes as magnitude. *)
  val add : t -> t -> unit

  (** Sets a field element to be the product of two others. Requires
      the inputs' magnitudes to be at most 8.  The output magnitude is
      1 (but not guaranteed to be normalized). *)
  val mul : t -> t -> t -> unit

  (** Sets a field element to be the square of another. Requires the
      input's magnitude to be at most 8.  The output magnitude is 1
      (but not guaranteed to be normalized). *)
  val sqr : t -> t -> unit

  (** If a has a square root, it is computed in r and 1 is
      returned. If a does not have a square root, the root of its
      negation is computed and 0 is returned. The input's magnitude
      can be at most 8. The output magnitude is 1 (but not guaranteed
      to be normalized). The result in r will always be a square
      itself. *)
  val sqrt : t -> t -> int

  (** Checks whether a field element is a quadratic residue. *)
  val is_quad_var : t -> bool

  (** Sets a field element to be the (modular) inverse of
      another. Requires the input's magnitude to be at most 8. The
      output magnitude is 1 (but not guaranteed to be normalized). *)
  val inv : t -> t -> unit

  (** Potentially faster version of secp256k1_fe_inv, without
      constant-time guarantee. *)
  val inv_var : t -> t -> unit

  (** Calculate the (modular) inverses of a batch of field
      elements. Requires the inputs' magnitudes to be at most 8. The
      output magnitudes are 1 (but not guaranteed to be
      normalized). The inputs and outputs must not overlap in
      memory. *)
  val inv_all_var : t -> t list -> unit

  (** Convert a field element to the storage type. *)
  val to_storage : Storage.t -> t -> unit

  (** Convert a field element back from the storage type. *)
  val from_storage : t -> Storage.t -> unit

  (** If flag is true, set *r equal to *a; otherwise leave
      it. Constant-time. *)
  val cmov : t -> t -> bool -> unit
end

module Group : sig
  (** Type of a group element (affine coordinates). *)
  type t

  type ge = t

  module Storage : sig
    type t

    val size : int

    val of_cstruct : Cstruct.t -> t option

    val of_cstruct_exn : Cstruct.t -> t

    val to_cstruct : t -> Cstruct.t

    val of_fields : ?x:Field.Storage.t -> ?y:Field.Storage.t -> unit -> t

    (** If flag is true, set *r equal to *a; otherwise leave
        it. Constant-time. *)
    val cmov : t -> t -> bool -> unit
  end

  module Jacobian : sig
    (** Type of a group element (jacobian). *)
    type t

    val of_fields :
      ?x:Field.t -> ?y:Field.t -> ?z:Field.t -> ?infinity:bool -> unit -> t

    (** Set a group element (jacobian) equal to the point at
        infinity. *)
    val set_infinity : t -> unit

    (** Set a group element equal to another which is given in jacobian
        coordinates. *)
    val get_ge : ge -> t -> unit

    (** Set a group element (jacobian) equal to another which is given
        in affine coordinates. *)
    val set_ge : t -> ge -> unit

    (** Compare the X coordinate of a group element (jacobian). *)
    val eq_x_var : Field.t -> t -> int

    (** [neg r a] Set r equal to the inverse of a (i.e., mirrored
        around the X axis) *)
    val neg : t -> t -> unit

    (** Check whether a group element is the point at infinity. *)
    val is_infinity : t -> bool

    (** Check whether a group element's y coordinate is a quadratic
        residue. *)
    val has_quad_y_var : t -> bool

    (** [double_nonzero ?rzr r a] Set [r] equal to the double of
        [a]. If rzr is not-None, [r->z = a->z * *rzr] (where infinity
        means an implicit z = 0). [a] may not be zero. Constant
        time. *)
    val double_nonzero : ?rzr:Field.t -> t -> t -> unit

    (** [double_var ?rzr r a] Set [r] equal to the double of [a]. If
        [rzr] is not-None, [r->z = a->z * *rzr] (where infinity means
        an implicit z = 0). *)
    val double_var : ?rzr:Field.t -> t -> t -> unit

    (** [add_var ?rzr r a b] Set [r] equal to the sum of [a] and
        [b]. If rzr is non-None, [r->z = a->z * *rzr] ([a] cannot be
        infinity in that case). *)
    val add_var : ?rzr:Field.t -> t -> t -> t -> unit

    (** [add_ge r a b] Set [r] equal to the sum of [a] and [b] (with [b] given
        in affine coordinates, and not infinity). *)
    val add_ge : t -> t -> ge -> unit

    (** [add_ge_var ?rzr r a b] Set [r] equal to the sum of [a] and [b]
        (with [b] given in affine coordinates). This is more efficient
        than [add_var]. It is identical to [add_ge] but without
        constant-time guarantee, and [b] is allowed to be infinity. If
        rzr is non-None, [r->z = a->z * *rzr] ([a] cannot be infinity
        in that case). *)
    val add_ge_var : ?rzr:Field.t -> t -> t -> ge -> unit

    (** Set r equal to the sum of a and b (with the inverse of b's Z
        coordinate passed as bzinv). *)
    val add_zinv_var : t -> t -> ge -> Field.t -> unit

    val mul : t -> ge -> Scalar.t -> unit

    (** Clear a [t] to prevent leaking sensitive information. *)
    val clear : t -> unit

    (** Rescale a jacobian point by b which must be
        non-zero. Constant-time. *)
    val rescale : t -> Field.t -> unit
  end

  val of_fields : ?x:Field.t -> ?y:Field.t -> ?infinity:bool -> unit -> t

  val g : t

  (** Set a group element equal to the point with given X and Y
      coordinates *)
  val set_xy : t -> Field.t -> Field.t -> unit

  (** Set a group element (affine) equal to the point with the given X
      coordinate and a Y coordinate that is a quadratic residue modulo
      p. The return value is true iff a coordinate with the given X
      coordinate exists. *)
  val set_xquad : t -> Field.t -> unit

  (** Set a group element (affine) equal to the point with the given X
      coordinate, and given oddness for Y. Return value indicates
      whether the result is valid. *)
  val set_xovar : t -> Field.t -> int -> bool

  (** Check whether a group element is the point at infinity. *)
  val is_infinity : t -> bool

  (** Check whether a group element is valid (i.e., on the curve). *)
  val is_valid_var : t -> bool

  (** [neg r a] Set r equal to the inverse of a (i.e., mirrored
      around the X axis) *)
  val neg : t -> t -> unit

  (** Clear a [t] to prevent leaking sensitive information. *)
  val clear : t -> unit

  (** Convert a group element to the storage type. *)
  val to_storage : Storage.t -> t -> unit

  (** Convert a group element back from the storage type. *)
  val from_storage : t -> Storage.t -> unit

  (** [to_pubkey ?compress buf ge] serializes [ge] in [buf] and
      returns [buf], adjusted to the actual size. *)
  val to_pubkey : ?compress:bool -> Cstruct.t -> t -> Cstruct.t

  (** [from_pubkey ge buf] parses a serialized pubkey in [buf] and
      writes the result in [ge]. *)
  val from_pubkey : t -> Cstruct.t -> unit
end
