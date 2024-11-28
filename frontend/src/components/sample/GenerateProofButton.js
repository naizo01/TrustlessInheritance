import React, { useState } from "react";
import * as snarkjs from "snarkjs";
const circomlibjs = require("circomlibjs");

export default function GenerateProofButton() {
  const [inputValue, setInputValue] = useState("");
  const [proof, setProof] = useState(null);
  const [solidityCallData, setSolidityCallData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateProof = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 入力値を数値に変換
      const input = Number(inputValue);
      if (isNaN(input)) {
        throw new Error("Please enter a valid number");
      }

      // Poseidonハッシュの計算
      const poseidon = await circomlibjs.buildPoseidon();
      const hash = poseidon.F.toString(poseidon([input]));

      // プルーフの生成
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { in: input, hash: hash },
        "/zk/poseidon_hasher.wasm",
        "/zk/circuit_0000.zkey"
      );

      // Solidity用のコールデータ生成
      const callData = await snarkjs.groth16.exportSolidityCallData(
        proof,
        publicSignals
      );

      // コールデータをパース
      const [pA, pB, pC, pubSignals] = callData.split(',').map(str => 
        str.trim().replace(/[\[\]"]/g, '')
      );

      const formattedCallData = {
        pA: pA.split(' ').map(x => x),
        pB: [
          pB.split(' ').slice(0, 2),
          pB.split(' ').slice(2, 4)
        ],
        pC: pC.split(' ').map(x => x),
        pubSignals: pubSignals.split(' ').map(x => x)
      };

      setSolidityCallData(formattedCallData);

      // プルーフデータを整形
      const formattedProof = {
        pA: proof.pi_a.slice(0, 2).map(x => BigInt(x)),
        pB: [
          proof.pi_b[0].slice(0, 2).map(x => BigInt(x)),
          proof.pi_b[1].slice(0, 2).map(x => BigInt(x))
        ],
        pC: proof.pi_c.slice(0, 2).map(x => BigInt(x)),
        pubSignals: publicSignals.map(x => BigInt(x))
      };

      setProof(formattedProof);

    } catch (err) {
      console.error('Error generating proof:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadProof = () => {
    if (!proof) return;

    const blob = new Blob(
      [JSON.stringify(proof, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proof.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCallData = () => {
    if (!solidityCallData) return;

    const blob = new Blob(
      [JSON.stringify(solidityCallData, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calldata.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Generate ZK Proof</h2>
      <div style={{ marginBottom: '20px' }}>
        <label>
          Input Value:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            style={{ color: 'white' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={generateProof}
          disabled={isLoading || !inputValue}
          style={{ marginRight: '10px' }}
        >
          {isLoading ? "Generating..." : "Generate Proof"}
        </button>

        {proof && (
          <button 
            onClick={downloadProof}
            style={{ marginRight: '10px' }}
          >
            Download Proof
          </button>
        )}

        {solidityCallData && (
          <button onClick={downloadCallData}>
            Download Calldata
          </button>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {proof && (
        <div style={{ marginTop: '20px' }}>
          <h3>Generated Proof:</h3>
          <pre>
            {JSON.stringify(proof, (_, v) => 
              typeof v === 'bigint' ? v.toString() : v, 2
            )}
          </pre>
        </div>
      )}

      {solidityCallData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Solidity Call Data:</h3>
          <pre>
            {JSON.stringify(solidityCallData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}