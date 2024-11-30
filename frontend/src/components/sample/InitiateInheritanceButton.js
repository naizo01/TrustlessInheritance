import React, { useState } from "react";
import { useAccount } from "wagmi";
import useInitiateInheritance from "@/hooks/useInitiateInheritance";
import useGenerateProof from "@/hooks/useGenerateProof";

export default function InitiateInheritanceButton() {
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [proofData, setProofData] = useState(null);
  
  const { generateProof } = useGenerateProof();
  const { writeContract, waitFn } = useInitiateInheritance(contractAddress, proofData);

  const handleGenerateProof = async () => {
    try {
      const input = Number(inputValue);
      if (isNaN(input)) {
        throw new Error("Please enter a valid number");
      }

      const proof = await generateProof(input);
      console.log("Generated proof data:", proof);
      setProofData(proof);

    } catch (err) {
      console.error('Error generating proof:', err);
    }
  };

  const handleInitiateInheritance = () => {
    if (!contractAddress) {
      alert("Please enter a valid contract address.");
      return;
    }
    if (!proofData) {
      alert("Please generate proof first.");
      return;
    }
    writeContract();
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
      <div style={{ marginBottom: '20px' }}>
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
          onClick={handleGenerateProof}
          disabled={!inputValue}
          style={{ marginRight: '10px' }}
        >
          Generate Proof
        </button>

        <button 
          onClick={handleInitiateInheritance} 
          disabled={!userAddress || waitFn.isLoading || !proofData}
        >
          {getButtonText()}
        </button>
      </div>

      {waitFn.isLoading && <p>Transaction is being processed...</p>}
      {waitFn.isSuccess && <p>Transaction successful!</p>}
      {waitFn.isError && <p>Transaction failed. Please try again.</p>}
      
      {proofData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Current Proof Data:</h3>
          <div>
            <h4>_pA:</h4>
            <pre>{JSON.stringify(proofData._pA, null, 2)}</pre>
            <h4>_pB:</h4>
            <pre>{JSON.stringify(proofData._pB, null, 2)}</pre>
            <h4>_pC:</h4>
            <pre>{JSON.stringify(proofData._pC, null, 2)}</pre>
            <h4>_pubSignals:</h4>
            <pre>{JSON.stringify(proofData._pubSignals, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
