import React, { useState } from "react";
import { useAccount } from "wagmi";
import useAddApprovedTokens from "@/hooks/useAddApprovedTokens";

export default function AddApprovedTokensButton({
  contractAddress,
  selectedTokens,
}) {
  const { address: userAddress } = useAccount();

  const { writeContract, waitFn } = useAddApprovedTokens(
    contractAddress,
    selectedTokens.map((token) => token.address)
  );

  const getButtonText = () => {
    if (!userAddress) return "Walletを接続ください";
    if (waitFn.isLoading) return "処理中...";
    if (waitFn.isSuccess) return "承認完了";
    if (waitFn.isError) return "要再承認";
    return "承認が完了したトークンを追加ください";
  };

  const handleAddApprovedTokens = () => {
    writeContract();
  };

  return (
    <button
      className="w-full py-4 text-gray-700 dark:text-gray-200"
      onClick={handleAddApprovedTokens}
      disabled={!userAddress || waitFn.isLoading}
      style={{
        backgroundColor: "white",
        color: "black",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "10px 20px",
        cursor: "pointer",
      }}
    >
      {getButtonText()}
    </button>
  );
}
