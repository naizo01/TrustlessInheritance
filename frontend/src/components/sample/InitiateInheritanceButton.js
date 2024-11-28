import React, { useState } from "react";
import { useAccount } from "wagmi";
import useInitiateInheritance from "@/hooks/useInitiateInheritance";

export default function InitiateInheritanceButton() {
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [proof, setProof] = useState({
    pA: [0n, 0n],
    pB: [[0n, 0n], [0n, 0n]],
    pC: [0n, 0n],
    pubSignals: [0n]
  });

  const { writeContract, waitFn } = useInitiateInheritance(contractAddress, proof);

  const handleInitiateInheritance = () => {
    if (contractAddress) {
      writeContract();
    } else {
      alert("Please enter a valid contract address.");
    }
  };

  // ZKプルーフのアップデートハンドラー（実際の実装に合わせて修正が必要です）
  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const proofData = JSON.parse(e.target.result);
        // BigIntに変換
        const convertedProof = {
          pA: proofData.pA.map(n => BigInt(n)),
          pB: proofData.pB.map(row => row.map(n => BigInt(n))),
          pC: proofData.pC.map(n => BigInt(n)),
          pubSignals: proofData.pubSignals.map(n => BigInt(n))
        };
        setProof(convertedProof);
      } catch (error) {
        console.error('Error parsing proof file:', error);
        alert('Invalid proof file format');
      }
    };
    reader.readAsText(file);
  };

  const getButtonText = () => {
    if (!userAddress) return "Connect Wallet";
    if (waitFn.isLoading) return "Processing...";
    if (waitFn.isSuccess) return "Initiated!";
    if (waitFn.isError) return "Retry";
    return "Initiate Inheritance";
  };

  return (
    <div>
      <h2>Initiate Inheritance</h2>
      <div>
        <label>
          Contract Address:
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Enter contract address"
            style={{ color: 'white' }}
          />
        </label>
      </div>
      
      <div>
        <label>
          ZK Proof:
          <input
            type="file"
            accept=".json"
            onChange={handleProofUpload}
            style={{ color: 'white' }}
          />
        </label>
      </div>
      
      <button 
        onClick={handleInitiateInheritance} 
        disabled={!userAddress || waitFn.isLoading}
      >
        {getButtonText()}
      </button>

      {waitFn.isLoading && <p>Transaction is being processed...</p>}
      {waitFn.isSuccess && <p>Transaction successful!</p>}
      {waitFn.isError && <p>Transaction failed. Please try again.</p>}
      
      {/* プルーフの現在の状態を表示（デバッグ用） */}
      <div style={{ marginTop: '20px' }}>
        <h3>Current Proof Status:</h3>
        <pre>
          {JSON.stringify(proof, (_, v) => 
            typeof v === 'bigint' ? v.toString() : v, 2
          )}
        </pre>
      </div>
    </div>
  );
}