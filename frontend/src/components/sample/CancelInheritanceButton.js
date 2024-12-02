import React, { useState } from "react";
import { useAccount } from "wagmi";
import useCancelInheritance from "@/hooks/useCancelInheritance";

export default function CancelInheritanceButton() {
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const { writeContract, waitFn } = useCancelInheritance(contractAddress);

  const handleCancelInheritance = () => {
    if (contractAddress) {
      writeContract();
    } else {
      alert("Please enter a valid contract address.");
    }
  };

  const getButtonText = () => {
    if (!userAddress) return "Connect Wallet";
    if (waitFn.isLoading) return "Processing...";
    if (waitFn.isSuccess) return "Cancelled!";
    if (waitFn.isError) return "Retry";
    return "Cancel Inheritance";
  };

  return (
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <h2 style={{ color: 'black' }}>Cancel Inheritance</h2>
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
      
      <button 
        onClick={handleCancelInheritance} 
        disabled={!userAddress || waitFn.isLoading}
        style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {getButtonText()}
      </button>

      {waitFn.isLoading && <p style={{ color: 'black' }}>Transaction is being processed...</p>}
      {waitFn.isSuccess && <p style={{ color: 'black' }}>Transaction successful!</p>}
      {waitFn.isError && <p style={{ color: 'black' }}>Transaction failed. Please try again.</p>}
    </div>
  );
}