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
import InheritanceAssetsLockedPage from "@/components/bob-inheritance-assets-locked";
import InheritanceAssetsUnlockedPage from "@/components/bob-inheritance-assets-unlocked";

export default function Home() {
  const [num, setNum] = useState(0);
  const [isApproved, setIsApproved] = useState(true);
  const [isMatured, setIsMatured] = useState(true);

  return (
    <>
      {num === 0 && <BobLandingPage onClick={setNum} />}
      {num === 1 && <AddressInputPage onClick={setNum} />}
      {num === 2 && <ConfirmAddressesPage onClick={setNum} />}
      {!isApproved && num === 3 && <InheritanceAssetsPage onClick={setNum} />}
      {!isApproved && num === 4 && <ZKProofGenerationPage onClick={setNum} />}
      {!isApproved && num === 5 && <ZKProofConfirmationPage onClick={setNum} />}
      {!isApproved && num === 6 && <ApplicationResultPage onClick={setNum} />}
      {isApproved && !isMatured && num === 3 && (
        <InheritanceAssetsLockedPage onClick={setNum} />
      )}
      {isApproved && isMatured && num === 3 && (
        <InheritanceAssetsUnlockedPage onClick={setNum} />
      )}
      {isApproved && isMatured && num === 4 && ""}
      {isApproved && isMatured && num === 5 && ""}
      {isApproved && isMatured && num === 6 && ""}
    </>
  );
}
