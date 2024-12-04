const snarkjs = require("snarkjs");
const circomlibjs = require("circomlibjs");
const fs = require("fs");

(async function () {
    // 数値入力の準備
    let input = 123456789;

    const poseidon = await circomlibjs.buildPoseidon();
    const hash = poseidon.F.toString(poseidon([input]));

    console.log("hash:",hash)

    // 証明の生成
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { in : input, hash: hash },
        "build/Password_validator_js/Password_validator.wasm",
        "circuit_password.zkey"
    );

    console.log("Public Signals (Length):", publicSignals); // 文字列の長さを出力
    console.log("Proof:", proof);

    // Solidity用のコールデータの生成
    const solidityCallData = await snarkjs.groth16.exportSolidityCallData(
        proof,
        publicSignals
    );
    console.log("Call data for solidity verification:", solidityCallData);

    // 検証キーの読み込み
    const vKey = JSON.parse(fs.readFileSync("verification_key_password.json"));
    try {
        // 証明の検証
        const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
        console.log(res);

        if (res === true) {
            console.log("Verification OK");
        } else {
            console.log("Invalid proof");
        }
    } catch (error) {
        console.error("失敗した:", error.message);
    }

    process.exit(0);
})();