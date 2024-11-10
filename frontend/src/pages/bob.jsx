"use client";

import { useState } from "react";

// pages/index.tsx
import { InheritanceUi } from "@/components/inheritance-ui";
import BobLandingPage from "@/components/bob-landing-page";
import AddressInputPage from "@/components/bob-address-input";
import ConfirmAddressesPage from "@/components/bob-confirm-addresses";
import InheritanceAssetsPage from "@/components/bob-inheritance-assets";
import ZKProofGenerationPage from "@/components/bob-zk-proof-generation";
import ZKProofConfirmationPage from "@/components/bob-zk-proof-confirmation";
import ApplicationResultPage from "@/components/bob-application-result";

export default function Home() {
  const [num, setNum] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [isMatured, setIsMatured] = useState(false);

  return (
    <>
      {!isApproved && num === 0 && <BobLandingPage onClick={setNum} />}
      {!isApproved && num === 1 && <AddressInputPage onClick={setNum} />}
      {!isApproved && num === 2 && <ConfirmAddressesPage onClick={setNum} />}
      {!isApproved && num === 3 && <InheritanceAssetsPage onClick={setNum} />}
      {!isApproved && num === 4 && <ZKProofGenerationPage onClick={setNum} />}
      {!isApproved && num === 5 && <ZKProofConfirmationPage onClick={setNum} />}
      {!isApproved && num === 6 && <ApplicationResultPage onClick={setNum} />}
      {isApproved && !isMatured && ""}
      {isApproved && isMatured && ""}
    </>
  );
}
