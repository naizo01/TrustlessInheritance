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
    <div>
      <div>
        <label>
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
            style={{ color: 'white'}}
          />
        </label>
      </div>
      <div>
        <label>
          Lock Time:
          <input
            type="number"
            value={lockTime.toString()}
            onChange={(e) => setLockTime(BigInt(e.target.value))}
            placeholder="Enter lock time"
            style={{ color: 'white'}}
          />
        </label>
      </div>
      <button onClick={handleCreateProxy}>Create Proxy</button>
      {waitFn.isLoading && <p>Transaction is processing...</p>}
      {waitFn.isSuccess && <p>Proxy created successfully!</p>}
      {waitFn.isError && <p>Error creating proxy.</p>}
    </div>
  );
};

export default CreateProxyButton;