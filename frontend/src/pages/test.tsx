import React from 'react';
import TokenBalances from '@/components/sample/TokenBalances';
import ApproveToken from '@/components/sample/ApproveToken';
import CreateProxyButton from '@/components/sample/CreateProxyButton';
import ProxyCreatedEventsList from '@/components/sample/ProxyCreatedEventsList';
import AddApprovedTokensButton from '@/components/sample/AddApprovedTokensButton';
import CancelInheritanceButton from '@/components/sample/CancelInheritanceButton';
import InitiateInheritanceButton from '@/components/sample/InitiateInheritanceButton';
import WithdrawTokensButton from '@/components/sample/WithdrawTokensButton';
import { ConnectKitButton } from "connectkit";
import GenerateProofButton from '@/components/sample/GenerateProofButton';


export default function Home() {
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
        <AddApprovedTokensButton />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <CancelInheritanceButton />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <GenerateProofButton />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <InitiateInheritanceButton />
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <WithdrawTokensButton />
      </div>
    </div>
  );
}
