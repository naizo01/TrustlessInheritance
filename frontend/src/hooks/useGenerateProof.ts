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

export default function useGenerateProof(user: string): UseGenerateProofReturn {
  const generateProof = async (input: number): Promise<ProofData> => {
    try {
      const poseidon = await circomlibjs.buildPoseidon();
      const hash = poseidon.F.toString(poseidon([input]));

      console.log("Generating proof with input:", input, "hash:", hash);

      const wasm: string = (() => {
        switch (user) {
          case "bob":
            return "/zk/poseidon_hasher.wasm";
          case "alice":
            return "/zk/Password_validator.wasm";
          default:
            throw new Error("Invalid user");
        }
      })();

      const zkey: string = (() => {
        switch (user) {
          case "bob":
            return "/zk/circuit_0000.zkey";
          case "alice":
            return "/zk/circuit_password.zkey";
          default:
            throw new Error("Invalid user");
        }
      })();

      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { in: input, hash: hash },
        wasm,
        zkey
      );

      console.log("Raw proof generated:", proof);
      console.log("Public signals:", publicSignals);

      // Solidity用のコールデータ生成
      const solidityCallData = await snarkjs.groth16.exportSolidityCallData(
        proof,
        publicSignals
      );

      console.log("Solidity call data:", solidityCallData);

      // コールデータをJSON形式に変換
      const jsonData = JSON.parse(`[${solidityCallData}]`);
      
      const proofData = {
        _pA: jsonData[0],
        _pB: jsonData[1],
        _pC: jsonData[2],
        _pubSignals: jsonData[3]
      };

      console.log("Final proof data:", proofData);

      return proofData;

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
