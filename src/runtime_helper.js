//global: _SECP256K1

//Provides: wasm_int_pointer
//Requires: caml_ba_from_typed_array
function wasm_int_pointer(x) {
  return caml_ba_from_typed_array(new joo_global_object.Uint32Array([x]));
}

//Provides: wasm_ints_pointer
//Requires: caml_ba_from_typed_array
function wasm_ints_pointer(x) {
  return caml_ba_from_typed_array(new joo_global_object.Uint32Array(x));
}

//Provides:call_wasm
//Requires: Ml_Bigarray, caml_failwith
function call_wasm() {
  var g = joo_global_object;
  var M = g._SECP256K1;
  var f = arguments[0];
  if (!M[f]) {
    caml_failwith(f + " is not implemented");
  }
  var args = Array.prototype.slice.call(arguments, 1);
  var argsc = args.slice();
  for (var i = 0; i < args.length; i++) {
    var x = args[i];
    if (typeof x == "number" || typeof x == "boolean" || x === null) {
      continue;
    } else if (x instanceof Ml_Bigarray) {
      var p = M._malloc(x.data.length, x.data.BYTES_PER_ELEMENT);
      switch (x.data.BYTES_PER_ELEMENT) {
        case 1:
          M.HEAPU8.set(x.data, p);
          break;
        case 4:
          M.HEAPU32.set(x.data, p >> 2);
          break;
        default:
          caml_failwith(
            "call_wasm: unsuported buffer" + x.data.BYTES_PER_ELEMENT
          );
      }
      argsc[i] = p;
    } else {
      caml_failwith(
        "call_wasm: " + f + " called with unsupported argument type"
      );
    }
  }
  var r = M[f].apply(null, argsc);

  for (i = 0; i < args.length; i++) {
    var x = args[i];
    if (x instanceof Ml_Bigarray) {
      var p = argsc[i];
      switch (x.data.BYTES_PER_ELEMENT) {
        case 1:
          x.data.set(new g.Uint8Array(M.HEAPU8.buffer, p, x.data.length));
          break;
        case 4:
          x.data.set(new g.Uint32Array(M.HEAPU32.buffer, p, x.data.length));
          break;
        default:
          caml_failwith("call_wasm: unsuported buffer");
      }
      M._free(p);
    }
  }
  return r;
}

//Provides: secp256k1_wasm_allocate
function secp256k1_wasm_allocate(x) {
  var M = joo_global_object._SECP256K1;
  var ptr = M._malloc(x.data.length);
  M.HEAPU8.set(x.data, ptr);
  return ptr;
}

//Provides: secp256k1_wasm_update
function secp256k1_wasm_update(x, ptr) {
  var M = joo_global_object._SECP256K1;
  var data = new joo_global_object.Uint8Array(
    M.HEAPU8.buffer,
    ptr,
    x.data.length
  );
  x.data.set(data);
  M._free(ptr);
  return 0;
}

//Provides: secp256k1_wasm_free
function secp256k1_wasm_free(ptr) {
  var _SECP256K1 = joo_global_object._SECP256K1;
  return _SECP256K1._free(ptr);
}
