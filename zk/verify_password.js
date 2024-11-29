const snarkjs = require("snarkjs");
const fs = require("fs");

(async function () {
    // 入力データの準備
    // 例として、ASCIIコードの配列を使用
    const inputArray = [80, 97, 115, 115, 119, 111, 114, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // "Password" + padding

    // 証明の生成
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { in: inputArray },
        "build/password_validator_js/password_validator.wasm",
        "circuit_password.zkey"
    );

    console.log("Public Signals:", publicSignals);
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