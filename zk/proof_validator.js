const snarkjs = require("snarkjs");
const circomlibjs = require("circomlibjs");
const fs = require("fs");

(async function () {
    // Poseidonハッシュ関数の初期化
    const poseidon = await circomlibjs.buildPoseidon();

    // 入力データの準備
    const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const hash = poseidon.F.toString(poseidon(inputArray));

    // 証明の生成
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { in: inputArray, hash: hash },
        "build/poseidon_validator_js/poseidon_validator.wasm",
        "circuit_0001.zkey"
    );

    console.log("Public Signals:", publicSignals);
    console.log("Proof:", proof);

    // Solidity用のコールデータの生成
    const solidityCallData = await snarkjs.groth16.exportSolidityCallData(
        proof,
        publicSignals
    );
    console.log("Call data for solidity verification:", solidityCallData);

    process.exit(0);
})();