"use client";

// pages/index.tsx
import { InheritanceUi } from "@/components/inheritance-ui";
import BobLandingPage from "@/components/bob-landing-page";
import AddressInputPage from "@/components/bob-address-input";
import ConfirmAddressesPage from "@/components/bob-confirm-addresses";

export default function Home() {
  return <ConfirmAddressesPage />;
}
