import React, { useState } from "react";
import { useAccount } from "wagmi";
import useInitiateInheritance from "@/hooks/useInitiateInheritance";
import useGenerateProof from "@/hooks/useGenerateProof";

export default function InitiateInheritanceButton() {
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [proofData, setProofData] = useState(null);
  
  const { generateProof } = useGenerateProof("bob");
  const { writeContract, waitFn } = useInitiateInheritance(contractAddress, proofData);

  const handleGenerateProof = async () => {
    try {
      const input = Number(inputValue);
      if (isNaN(input)) {
        throw new Error("Please enter a valid number");
      }

      const proof = await generateProof(input);
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
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <h2 style={{ color: 'black' }}>Initiate Inheritance</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: 'black' }}>
          Contract Address:
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Enter contract address"
            style={{ color: 'black', backgroundColor: 'white', border: '1px solid black', borderRadius: '3px', padding: '5px', width: "500px" }}
          />
        </label>
      </div>
  
      <div style={{ marginBottom: '20px' }}>
        <label style={{ color: 'black' }}>
          Input Value:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            style={{ color: 'black', backgroundColor: 'white', border: '1px solid black', borderRadius: '3px', padding: '5px' }}
          />
        </label>
      </div>
  
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleGenerateProof}
          disabled={!inputValue}
          style={{ marginRight: '10px', backgroundColor: 'white', color: 'black', border: '1px solid black', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Generate Proof
        </button>
  
        <button 
          onClick={handleInitiateInheritance} 
          disabled={!userAddress || waitFn.isLoading || !proofData}
          style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
        >
          {getButtonText()}
        </button>
      </div>
  
      {waitFn.isLoading && <p style={{ color: 'black' }}>Transaction is being processed...</p>}
      {waitFn.isSuccess && <p style={{ color: 'black' }}>Transaction successful!</p>}
      {waitFn.isError && <p style={{ color: 'black' }}>Transaction failed. Please try again.</p>}
      
      {proofData && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: 'black' }}>Current Proof Data:</h3>
          <div>
            <h4 style={{ color: 'black' }}>_pA:</h4>
            <pre style={{ color: 'black' }}>{JSON.stringify(proofData._pA, null, 2)}</pre>
            <h4 style={{ color: 'black' }}>_pB:</h4>
            <pre style={{ color: 'black' }}>{JSON.stringify(proofData._pB, null, 2)}</pre>
            <h4 style={{ color: 'black' }}>_pC:</h4>
            <pre style={{ color: 'black' }}>{JSON.stringify(proofData._pC, null, 2)}</pre>
            <h4 style={{ color: 'black' }}>_pubSignals:</h4>
            <pre style={{ color: 'black' }}>{JSON.stringify(proofData._pubSignals, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
