import React, { useState } from "react";
import { useAccount } from "wagmi";
import useAddApprovedTokens from "@/hooks/useAddApprovedTokens";
import { Button } from "@/components/ui/button";

export default function AddApprovedTokensButton({
  contractAddress,
  selectedTokens,
  handleNext,
}) {
  const { address: userAddress } = useAccount();

  const getButtonText = () => {
    if (!userAddress) return "Walletを接続ください";
    if (waitFn.isLoading) return "処理中...";
    if (waitFn.isSuccess) return "承認完了";
    if (waitFn.isError) return "要再承認";
    return "トークン相続登録";
  };

  const handleAddApprovedTokens = () => {
    writeContract();
  };

  const handleError = (error) => {
    console.error("Error occurred:", error);
    setIsLoading(false);
  };

  const handleSuccess = (data) => {
    console.log("Transaction successful:", data);
    handleNext();
  };

  const { writeContract, waitFn } = useAddApprovedTokens(
    contractAddress,
    selectedTokens.map((token) => token.address),
    handleError,
    handleSuccess
  );

  return (
    <Button
      className="bg-blue-600 hover:bg-blue-700 text-white"
      onClick={handleAddApprovedTokens}
      disabled={!userAddress || waitFn.isLoading}
    >
      {getButtonText()}
    </Button>
  );
}
