"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import useApprove from "@/hooks/useApprove";
import { Button } from "@/components/ui/button";

export default function ApproveTokenButton({ approveAddress, selectedToken }) {
  const { address: userAddress } = useAccount();

  // uint256の最大値
  const maxUint256 = BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );

  const { writeContract, waitFn, readFn } = useApprove(
    approveAddress || "0x5E4D21133Ff33327db9edfE879edf3Acc45e7330",
    selectedToken.address,
    maxUint256
  );

  const handleApprove = () => {
    if (approveAddress) {
      writeContract();
    } else {
      alert("Please enter a valid address to approve.");
    }
  };

  const getButtonText = () => {
    if (!userAddress) return "Walletを接続ください";
    if (waitFn.isLoading) return "処理中...";
    if (waitFn.isSuccess) return "登録完了";
    if (waitFn.isError) return "要再申請";
    return "転送許可";
  };

  return (
    <Button
      className={
        waitFn.isSuccess
          ? "bg-green-500 hover:bg-green-600 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }
      onClick={handleApprove}
      disabled={!userAddress || waitFn.isLoading}
    >
      {getButtonText()}
    </Button>
  );
}
