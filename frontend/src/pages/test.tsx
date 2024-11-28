import React from 'react';
import TokenBalances from '@/components/sample/TokenBalances';
import ApproveToken from '@/components/sample/ApproveToken';

export default function Home() {
  return (
    <div>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <TokenBalances />
      </div>
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <ApproveToken />
      </div>
    </div>
  );
}