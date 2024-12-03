import React, { useState } from 'react';
import TokenBalances from '@/components/sample/TokenBalances';
import ApproveToken from '@/components/sample/ApproveToken';
import CreateProxyButton from '@/components/sample/CreateProxyButton';
import ProxyCreatedEventsList from '@/components/sample/ProxyCreatedEventsList';
import AddApprovedTokensButton from '@/components/sample/AddApprovedTokensButton';
import CancelInheritanceButton from '@/components/sample/CancelInheritanceButton';
import InitiateInheritanceButton from '@/components/sample/InitiateInheritanceButton';
import WithdrawTokensButton from '@/components/sample/WithdrawTokensButton';
import ProxyInfo from '@/components/sample/ProxyInfo';
import { ConnectKitButton } from "connectkit";

export default function Home() {
  const [callData, setCallData] = useState(null);

  return (
    <div>
      <ConnectKitButton />
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <TokenBalances />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <ApproveToken />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <CreateProxyButton />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <ProxyCreatedEventsList />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <ProxyInfo />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <AddApprovedTokensButton />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <CancelInheritanceButton />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <InitiateInheritanceButton/>
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <WithdrawTokensButton/>
      </div>

      {/* デバッグ用：現在のcallDataの状態を表示 */}
      {callData && (
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h3>Current CallData State:</h3>
          <pre>
            {JSON.stringify(callData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
