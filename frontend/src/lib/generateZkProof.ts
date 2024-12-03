// src/utils/generateZkProof.ts
import { groth16 } from 'snarkjs';
import { AbiCoder } from 'ethers';
import { buildPoseidon } from 'circomlibjs'

interface ProofData {
  pA: string[];
  pB: string[][];
  pC: string[];
  publicSignals: string[];
}

/**
* 文字列を回路入力用の数値に変換
* @param str 入力文字列
* @returns 数値文字列
*/
function stringToNumber(str: string): string {
   let hex = '';
   for (let i = 0; i < str.length; i++) {
       hex += str.charCodeAt(i).toString(16);
   }
   return BigInt('0x' + hex).toString();
}

/**
* Poseidonハッシュを計算
* @param input 入力値（数値文字列）
* @returns ハッシュ値
*/
export async function poseidonHash(input) {
    const poseidon = await buildPoseidon();
    const hash = poseidon.F.toString(poseidon([input]));
    return hash;
 }

/**
* Poseidonハッシュを計算
* @param input 入力値（数値文字列）
* @returns ハッシュ値
*/
export async function calculatePoseidonHash(input: string): Promise<string> {
    const poseidon = await buildPoseidon();
    const hash = poseidon.F.toString(poseidon([input]));
    const solidityHash = BigInt(hash).toString(16);
    return "0x" + solidityHash;
 }

export async function generateProof(secret: string): Promise<ProofData> {
  try {
      // 文字列を数値に変換
      const secretNumber = stringToNumber(secret);

      // ハッシュ値を計算
      const secretHash = await calculatePoseidonHash(secretNumber);

      // 入力の準備
      const input = {
          secret: secretNumber,
          secret_hash: secretHash
      };

      console.log('Circuit Input:', input);  // デバッグ用

      const { proof, publicSignals } = await groth16.fullProve(
          input,
          "./inheritanceProof.wasm",
          "./inheritanceProof_0001.zkey"
      );

      return {
          pA: proof.pi_a,
          pB: proof.pi_b,
          pC: proof.pi_c,
          publicSignals
      };
  } catch (error) {
      console.error("Error generating proof:", error);
      throw error;
  }
}

export async function generateAndEncodeProof(secret: string): Promise<string> {
   const proofData = await generateProof(secret);
   
   const abiCoder = new AbiCoder();
   const encodedProof = abiCoder.encode(
       ['tuple(uint256[2] pA, uint256[2][2] pB, uint256[2] pC, uint256[2] publicSignals)'],
       [proofData]
   );

   return encodedProof;
}

// ハッシュ値のみを取得する補助関数（コントラクトへの登録時などに使用）
export async function getSecretHash(secret: string): Promise<string> {
   const secretNumber = stringToNumber(secret);
   return calculatePoseidonHash(secretNumber);
}

// デバッグ用の関数
export async function testConversion(secret: string): Promise<void> {
   try {
       const secretNumber = stringToNumber(secret);
       const secretHash = await calculatePoseidonHash(secretNumber);
       
       console.log({
           originalSecret: secret,
           convertedNumber: secretNumber,
           calculatedHash: secretHash
       });
   } catch (error) {
       console.error("Conversion test failed:", error);
   }
}