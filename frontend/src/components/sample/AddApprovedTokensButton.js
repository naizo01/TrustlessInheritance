import React, { useState } from "react";
import { useAccount } from "wagmi";
import useAddApprovedTokens from "@/hooks/useAddApprovedTokens";
import { assets } from "@/lib/token";

const AddApprovedTokensButton = () => {
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [selectedTokens, setSelectedTokens] = useState([assets[0]]); 

  const { writeContract, waitFn } = useAddApprovedTokens(
    contractAddress,
    selectedTokens.map(token => token.address)
  );

  const handleAddTokenField = () => {
    setSelectedTokens([...selectedTokens, assets[0]]);
  };

  const handleTokenChange = (index, symbol) => {
    const newTokens = [...selectedTokens];
    newTokens[index] = assets.find(token => token.symbol === symbol);
    setSelectedTokens(newTokens);
  };

  const handleRemoveTokenField = (index) => {
    const newTokens = selectedTokens.filter((_, i) => i !== index);
    setSelectedTokens(newTokens);
  };

  const getButtonText = () => {
    if (!userAddress) return "Connect Wallet";
    if (waitFn.isLoading) return "Processing...";
    if (waitFn.isSuccess) return "Approved!";
    if (waitFn.isError) return "Retry";
    return "Add Approved Tokens";
  };

  const handleAddApprovedTokens = () => {
    if (!contractAddress) {
      alert('Please enter contract address');
      return;
    }
    writeContract();
  };

  return (
    <div>
      <h2>Add Approved Tokens</h2>
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

      {selectedTokens.map((token, index) => (
        <div key={index}>
          <label>
            Select Token:
            <select
              value={token.symbol}
              onChange={(e) => handleTokenChange(index, e.target.value)}
              style={{ color: 'white' }}
            >
              {assets.map((asset) => (
                <option key={asset.symbol} value={asset.symbol}>
                  {asset.name}
                </option>
              ))}
            </select>
          </label>
          <button 
            onClick={() => handleRemoveTokenField(index)}
            disabled={selectedTokens.length === 1}
          >
            Remove
          </button>
        </div>
      ))}
      
      <button onClick={handleAddTokenField}>
        Add Another Token
      </button>
      
      <button 
        onClick={handleAddApprovedTokens} 
        disabled={!userAddress || waitFn.isLoading}
      >
        {getButtonText()}
      </button>

      {waitFn.isLoading && <p>Transaction is being processed...</p>}
      {waitFn.isSuccess && <p>Transaction successful!</p>}
      {waitFn.isError && <p>Transaction failed. Please try again.</p>}
    </div>
  );
};

export default AddApprovedTokensButton;