#include <caml/mlvalues.h>
#include <caml/memory.h>
#include <caml/alloc.h>

CAMLprim value ml_hw_is_x86_64(value unit) {
    CAMLparam1(unit);
    CAMLlocal1(res);

    #ifdef __x86_64__
    int is_x86_64 = 1;
    #else
    int is_x86_64 = 0;
    #endif
    CAMLreturn(Val_int(is_x86_64));
}
