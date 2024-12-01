import React, { useState } from "react";
import useCreateProxy from "@/hooks/useCreateProxy";
import { calculatePoseidonHash } from "@/lib/generateZkProof";

const CreateProxyButton = () => {
  const [inputValue, setInputValue] = useState(0);
  const [lockTime, setLockTime] = useState(BigInt(0));
  const [hash, setHash] = useState("");

  const { writeContract, waitFn } = useCreateProxy(hash, lockTime);

  const handleHashInput = async (value) => {
    const hash = await calculatePoseidonHash(value);
    setHash(hash);
  };

  const handleCreateProxy = () => {
    writeContract();
  };

  return (
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <div>
        <label style={{ color: 'black' }}>
          private value:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              const value = Number(e.target.value);
              setInputValue(value);
              handleHashInput(value);
            }}
            placeholder="Enter value to hash"
            style={{ color: 'black', backgroundColor: 'white', border: '1px solid black', borderRadius: '3px', padding: '5px' }}
          />
        </label>
      </div>
      <div>
        <label style={{ color: 'black' }}>
          Lock Time:
          <input
            type="number"
            value={lockTime.toString()}
            onChange={(e) => setLockTime(BigInt(e.target.value))}
            placeholder="Enter lock time"
            style={{ color: 'black', backgroundColor: 'white', border: '1px solid black', borderRadius: '3px', padding: '5px' }}
          />
        </label>
      </div>
      <button 
        onClick={handleCreateProxy} 
        style={{ backgroundColor: 'white', color: 'black', border: '1px solid black', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Create Proxy
      </button>
      {waitFn.isLoading && <p style={{ color: 'black' }}>Transaction is processing...</p>}
      {waitFn.isSuccess && <p style={{ color: 'black' }}>Proxy created successfully!</p>}
      {waitFn.isError && <p style={{ color: 'black' }}>Error creating proxy.</p>}
    </div>
  );
};

export default CreateProxyButton;