import React from 'react';
import TokenBalances from '@/components/sample/TokenBalances';
import ApproveToken from '@/components/sample/ApproveToken';
import CreateProxyButton from '@/components/sample/CreateProxyButton';
import ProxyCreatedEventsList from '@/components/sample/ProxyCreatedEventsList';
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <div>
      <ConnectKitButton />
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <TokenBalances />
      </div>
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <ApproveToken />
      </div>
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <CreateProxyButton />
      </div>
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <ProxyCreatedEventsList />
      </div>
    </div>
  );
}