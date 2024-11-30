const snarkjs = require("snarkjs");
const circomlibjs = require("circomlibjs");

export type ProofData = {
  _pA: string[];
  _pB: string[][];
  _pC: string[];
  _pubSignals: string[];
};

export type UseGenerateProofReturn = {
  generateProof: (input: number) => Promise<ProofData>;
  isLoading: boolean;
  error: Error | null;
};

export default function useGenerateProof(): UseGenerateProofReturn {
  const generateProof = async (input: number): Promise<ProofData> => {
    try {
      const poseidon = await circomlibjs.buildPoseidon();
      const hash = poseidon.F.toString(poseidon([input]));

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { in: input, hash: hash },
        "/zk/poseidon_hasher.wasm",
        "/zk/circuit_0000.zkey"
      );

      // Solidity用のコールデータ生成
      const solidityCallData = await snarkjs.groth16.exportSolidityCallData(
        proof,
        publicSignals
      );

      // コールデータをJSON形式に変換
      const jsonData = JSON.parse(`[${solidityCallData}]`);
      
      return {
        _pA: jsonData[0],
        _pB: jsonData[1],
        _pC: jsonData[2],
        _pubSignals: jsonData[3]
      };

    } catch (err) {
      console.error('Error in generateProof:', err);
      throw err;
    }
  };

  return {
    generateProof,
    isLoading: false,
    error: null
  };
}
