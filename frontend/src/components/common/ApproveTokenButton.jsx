"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import useApprove from "@/hooks/useApprove";

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
    return "登録申請";
  };

  return (
    <button
      className={
        waitFn.isSuccess
          ? "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      }
      onClick={handleApprove}
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
