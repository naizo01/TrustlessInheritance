import React, { useState } from "react";
import useCreateProxy from "@/hooks/useCreateProxy";
import useGenerateProof from "@/hooks/useGenerateProof";

const CreateProxyButton = () => {
  const [inputValue, setInputValue] = useState(0);
  const [lockTime, setLockTime] = useState(BigInt(0));
  const [proofData, setProofData] = useState(null);
  const { generateProof } = useGenerateProof("alice");

  const { writeContract, waitFn } = useCreateProxy(lockTime, proofData);

  const handleGenerateProof = async () => {
    const proof = await generateProof(inputValue);
    setProofData(proof);
  };

  const handleCreateProxy = () => {
    writeContract();
  };

  return (
    <div style={{ padding: "20px", borderRadius: "5px" }}>
      <div>
        <label style={{ color: "black" }}>
          private value:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              const value = Number(e.target.value);
              setInputValue(value);
            }}
            placeholder="Enter value to hash"
            style={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "3px",
              padding: "5px",
            }}
          />
        </label>
      </div>
      <div>
        <label style={{ color: "black" }}>
          Lock Time:
          <input
            type="number"
            value={lockTime.toString()}
            onChange={(e) => setLockTime(BigInt(e.target.value))}
            placeholder="Enter lock time"
            style={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "3px",
              padding: "5px",
            }}
          />
        </label>
      </div>
      <button
        onClick={handleGenerateProof}
        disabled={!inputValue}
        style={{
          marginRight: "10px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Generate Proof
      </button>
      <button
        onClick={handleCreateProxy}
        style={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Create Proxy
      </button>
      {waitFn.isLoading && (
        <p style={{ color: "black" }}>Transaction is processing...</p>
      )}
      {waitFn.isSuccess && (
        <p style={{ color: "black" }}>Proxy created successfully!</p>
      )}
      {waitFn.isError && (
        <p style={{ color: "black" }}>Error creating proxy.</p>
      )}

      {/* デバッグ情報 */}
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
};

export default CreateProxyButton;
