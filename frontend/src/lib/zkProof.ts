// src/utils/zkProof.ts
import { groth16 } from 'snarkjs';
import { AbiCoder } from 'ethers';

interface ProofData {
   pA: string[];
   pB: string[][];
   pC: string[];
   publicSignals: string[];
}

export async function generateProof(secret: string): Promise<ProofData> {
   try {
       const input = {
           secret: secret
       };

       const { proof, publicSignals } = await groth16.fullProve(
           input,
           "/zk/inheritanceProof.wasm",
           "/zk/inheritanceProof_0001.zkey"
       );

       return {
           pA: proof.pi_a,
           pB: proof.pi_b,
           pC: proof.pi_c,
           publicSignals  // 変数名を統一
       };
   } catch (error) {
       console.error("Error generating proof:", error);
       throw error;
   }
}

export async function verifyAndGenerateProof(secret: string): Promise<string> {
    const proofData = await generateProof(secret);
    
    const abiCoder = new AbiCoder();
    const encodedProof = abiCoder.encode(
        ['tuple(uint256[2] pA, uint256[2][2] pB, uint256[2] pC, uint256[2] publicSignals)'],
        [proofData]
    );

    return encodedProof;
}