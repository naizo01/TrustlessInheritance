import React, { useState } from "react";
import { useAccount } from "wagmi";
import useWithdrawTokens from "@/hooks/useWithdrawTokens";
import useGenerateProof from "@/hooks/useGenerateProof";
import { assets } from "@/lib/token";

export default function WithdrawTokensButton() {
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [inputValue, setInputValue] = useState(""); // private input
  const [selectedTokens, setSelectedTokens] = useState([assets[0]]);
  const [amounts, setAmounts] = useState([0n]);
  const [proof, setProof] = useState(null); // proof data

  const { generateProof } = useGenerateProof();
  const { writeContract, waitFn } = useWithdrawTokens(
    contractAddress,
    selectedTokens.map((token) => token.address),
    amounts,
    proof
  );

  const handleGenerateProof = async () => {
    try {
      const input = Number(inputValue);
      if (isNaN(input)) {
        throw new Error("Please enter a valid number");
      }

      const proofData = await generateProof(input, selectedTokens, amounts);
      console.log("Generated proof data:", proofData);
      setProof(proofData);
    } catch (err) {
      console.error("Error generating proof:", err);
    }
  };

  const handleAddTokenField = () => {
    setSelectedTokens([...selectedTokens, assets[0]]);
    setAmounts([...amounts, 0n]);
  };

  const handleTokenChange = (index, symbol) => {
    const newTokens = [...selectedTokens];
    newTokens[index] = assets.find((token) => token.symbol === symbol);
    setSelectedTokens(newTokens);
  };

  const handleAmountChange = (index, value) => {
    const newAmounts = [...amounts];
    try {
      newAmounts[index] = BigInt(value);
      setAmounts(newAmounts);
    } catch (error) {
      console.error("Invalid amount:", error);
    }
  };

  const handleRemoveTokenField = (index) => {
    const newTokens = selectedTokens.filter((_, i) => i !== index);
    const newAmounts = amounts.filter((_, i) => i !== index);
    setSelectedTokens(newTokens);
    setAmounts(newAmounts);
  };

  const handleWithdraw = () => {
    if (!contractAddress) {
      alert("Please enter a valid contract address.");
      return;
    }
    if (!proof) {
      alert("Please generate proof before withdrawing.");
      return;
    }
    writeContract();
  };

  const getButtonText = () => {
    if (!userAddress) return "Connect Wallet";
    if (waitFn.isLoading) return "Processing...";
    if (waitFn.isSuccess) return "Withdrawn!";
    if (waitFn.isError) return "Retry";
    return "Withdraw Tokens";
  };

  return (
    <div>
      <h2>Withdraw Tokens</h2>
      <div>
        <label>
          Contract Address:
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Enter contract address"
            style={{ color: "white" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Input Value:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter private input value"
            style={{ color: "white" }}
          />
        </label>
      </div>

      {selectedTokens.map((token, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <label>
            Select Token:
            <select
              value={token.symbol}
              onChange={(e) => handleTokenChange(index, e.target.value)}
              style={{ color: "white", marginRight: "10px" }}
            >
              {assets.map((asset) => (
                <option key={asset.symbol} value={asset.symbol}>
                  {asset.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amounts[index].toString()}
              onChange={(e) => handleAmountChange(index, e.target.value)}
              placeholder="Enter amount"
              style={{ color: "white", marginRight: "10px" }}
            />
          </label>
          <button
            onClick={() => handleRemoveTokenField(index)}
            disabled={selectedTokens.length === 1}
          >
            Remove
          </button>
        </div>
      ))}

      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleAddTokenField}>Add Another Token</button>
      </div>

      <button
        onClick={handleGenerateProof}
        disabled={!inputValue || !selectedTokens.length || !amounts.length}
        style={{ marginRight: "10px" }}
      >
        Generate Proof
      </button>

      <button
        onClick={handleWithdraw}
        disabled={!userAddress || waitFn.isLoading || !proof}
      >
        {getButtonText()}
      </button>

      {waitFn.isLoading && <p>Transaction is being processed...</p>}
      {waitFn.isSuccess && <p>Transaction successful!</p>}
      {waitFn.isError && <p>Transaction failed. Please try again.</p>}

      {/* デバッグ情報 */}
      <div style={{ marginTop: "20px" }}>
        <h3>Current Proof Status:</h3>
        <pre>
          {JSON.stringify(
            proof,
            (_, v) => (typeof v === "bigint" ? v.toString() : v),
            2
          )}
        </pre>
      </div>
    </div>
  );
}

