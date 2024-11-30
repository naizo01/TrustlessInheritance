const snarkjs = require("snarkjs");
const circomlibjs = require("circomlibjs");
const fs = require("fs");

(async function () {
    const input = 123456789;
    const poseidon = await circomlibjs.buildPoseidon();
    const hash = poseidon.F.toString(poseidon([input]));
    console.log(hash);
    const { proof, publicSignals } = await snarkjs.groth16.fullProve({ in: input, hash: hash  }, "build/poseidon_hasher_js/poseidon_hasher.wasm", "circuit_0000.zkey");
    console.log(publicSignals);
    console.log(proof);

    const solidityCallData = await snarkjs.groth16.exportSolidityCallData(
        proof,
        publicSignals
      )
      console.log("Call data for solidity verification:", solidityCallData);

    process.exit(0);
})();