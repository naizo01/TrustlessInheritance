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
    <div>
      <h2>Cancel Inheritance</h2>
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
      
      <button 
        onClick={handleCancelInheritance} 
        disabled={!userAddress || waitFn.isLoading}
      >
        {getButtonText()}
      </button>

      {waitFn.isLoading && <p>Transaction is being processed...</p>}
      {waitFn.isSuccess && <p>Transaction successful!</p>}
      {waitFn.isError && <p>Transaction failed. Please try again.</p>}
    </div>
  );
}