function run () {
  var file = process.argv[2];
  process.argv.splice(1,1);
  console.log("Ready to run", file, "with argv = [" + process.argv.toString() + "]");
  // The script doesn't need to know it was started by init.js
  process.argv.splice(1,1);
  require(process.cwd() + "/" + file);
}

function load_secp256k1_wasm() {
  var _secp256k1 = require('@nomadic-labs/secp256k1wasm');
  return _secp256k1().then(function (SECP256K1) { global._SECP256K1 = SECP256K1 }).catch(e => console.log(e))
}

load_secp256k1_wasm().then(run);
