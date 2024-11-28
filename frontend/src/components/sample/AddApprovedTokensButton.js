import React, { useState } from "react";
import useAddApprovedTokens from "@/hooks/useAddApprovedTokens";

const AddApprovedTokensButton = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [proxyAddress, setProxyAddress] = useState("");

  const { writeContract, waitFn } = useAddApprovedTokens(tokenAddress, proxyAddress);

  const handleAddApprovedTokens = () => {
    writeContract();
  };

  return (
    <div>
      <div>
        <label>
          Token Address:
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Enter token address"
            style={{ color: 'white'}}
          />
        </label>
      </div>
      <div>
        <label>
          Proxy Address:
          <input
            type="text"
            value={proxyAddress}
            onChange={(e) => setProxyAddress(e.target.value)}
            placeholder="Enter proxy address"
            style={{ color: 'white'}}
          />
        </label>
      </div>
      <button onClick={handleAddApprovedTokens}>Add Approved Tokens</button>
      {waitFn.isLoading && <p>Transaction is processing...</p>}
      {waitFn.isSuccess && <p>Tokens approved successfully!</p>}
      {waitFn.isError && <p>Error approving tokens.</p>}
    </div>
  );
};

export default AddApprovedTokensButton;