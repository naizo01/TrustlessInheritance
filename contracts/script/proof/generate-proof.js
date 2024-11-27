// scripts/generate-proof.js
const snarkjs = require("snarkjs");
const circomlibjs = require("circomlibjs");
const path = require("path");

/**
 * 文字列を回路入力用の数値に変換
 * 変換方法：
 * 1. 各文字をASCIIコードに変換
 * 2. ASCIIコードを16進数文字列に変換
 * 3. 16進数文字列を10進数のBigIntに変換
 * 
 * 例：
 * "abc" -> [97, 98, 99] -> "616263" -> "6382179"
 * 
 * @param {string} str 入力文字列
 * @returns {Promise<string>} 数値文字列
 */

async function stringToNumber(str) {
    // 文字列を16進数に変換
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16);
    }
    // 16進数を10進数の数値に変換
    return BigInt('0x' + hex).toString();
}

async function main() {
    try {
        // 1. シークレット値の設定
        const secretString = "123";
        const secret = await stringToNumber(secretString);
        console.log('Original Secret:', secretString);
        console.log('Converted Secret:', secret);

        // 2. Poseidonハッシュの計算
        const poseidon = await circomlibjs.buildPoseidon();
        const secretHash = poseidon.F.toString(poseidon([secret]));
        console.log('Secret Hash:', secretHash);

        // 3. 入力の準備
        const input = {
            secret: secret,
            secret_hash: secretHash
        };
        console.log('Circuit Input:', input);

        // 4. プルーフの生成
        const wasmPath = path.resolve(__dirname, '../../setup/inheritanceProof.wasm');
        const zkeyPath = path.resolve(__dirname, '../../setup/inheritanceProof_0001.zkey');
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
            input,
            wasmPath,
            zkeyPath
        );

        console.log(proof)
        console.log(publicSignals)

        // 5. Foundryテスト用のフォーマットで出力
//         console.log('\nFoundry Test Values:');
//         console.log('=== Copy from here ===');
        
//         console.log(`uint256[2] memory pA = [
//     ${proof.pi_a[0]},
//     ${proof.pi_a[1]}
// ];`);

//         console.log(`\nuint256[2][2] memory pB = [
//     [
//         ${proof.pi_b[0][0]},
//         ${proof.pi_b[0][1]}
//     ],
//     [
//         ${proof.pi_b[1][0]},
//         ${proof.pi_b[1][1]}
//     ]
// ];`);

//         console.log(`\nuint256[2] memory pC = [
//     ${proof.pi_c[0]},
//     ${proof.pi_c[1]}
// ];`);

        console.log(`\nuint256[2] memory pubSignals = [
    ${publicSignals[0]},
    ${publicSignals[1]}
];`);

        console.log('\n=== Copy until here ===');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();