"use client";

import { useState, createContext, useContext, useReducer } from "react";

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
import TransferConfirmationPage from "@/components/bob-transfer-confirmation";
import TransferResultPage from "@/components/bob-transfer-result";

// Context
export const BobContext = createContext(null);

// Custom hook
export const useBobState = () => {
  const context = useContext(BobContext);
  if (!context)
    throw new Error("useBobState must be used within a BobProvider");
  return context;
};

// Initial state
const initialState = {
  step: 0,
  status: "waiting", // waiting, approved, matured
  deceasedAddress: "",
  inheritorAddress: "", // use useAddress; it's more reliable
  recipientAddress: "",
  lockEndDate: null, // including this date
  lockPeriod: null, // num of months
  assets: [], // asset granted
  withdrawals: [], // assets to transfer
  proof: "", // proof
};

// Action Types
export const BOB_ACTIONS = {
  MOVE_FORWARD: "MOVE_FORWARD",
  MOVE_SPECIFIC: "MOVE_SPECIFIC",
  SET_DECEASED_ADDRESS: "SET_DECEASED_ADDRESS",
  SET_INHERITOR_ADDRESS: "SET_INHERITOR_ADDRESS",
  SET_RECIPIENT_ADDRESS: "SET_RECIPIENT_ADDRESS",
  SET_LOCK_END_DATE: "SET_LOCK_END_DATE",
  SET_LOCK_PERIOD: "SET_LOCK_PERIOD",
  SET_ASSETS: "SET_ASSETS",
  SET_WITHDRAWAL: "SET_WITHDRAWALS",
  SET_APPROVAL: "SET_APPROVAL",
  SET_MATURED: "SET_MATURED",
  SET_PROOF: "SET_PROOF",
};

// Reducer
function bobReducer(state, action) {
  switch (action.type) {
    case BOB_ACTIONS.MOVE_FORWARD:
      return { ...state, step: state.step + 1 };
    case BOB_ACTIONS.MOVE_SPECIFIC:
      return { ...state, step: action.payload };
    case BOB_ACTIONS.SET_DECEASED_ADDRESS:
      return { ...state, deceasedAddress: action.payload };
    case BOB_ACTIONS.SET_INHERITOR_ADDRESS:
      return { ...state, inheritorAddress: action.payload };
    case BOB_ACTIONS.SET_ASSETS:
      return { ...state, assets: action.payload };
    case BOB_ACTIONS.SET_LOCK_PERIOD:
      return { ...state, lockPeriod: action.payload };
    case BOB_ACTIONS.SET_APPROVAL:
      return { ...state, status: "approved" };
    case BOB_ACTIONS.SET_MATURED:
      return { ...state, status: "matured" };
    case BOB_ACTIONS.SET_LOCK_END_DATE:
      return {
        ...state,
        lockEndDate: !action.payload
          ? new Date(Date.now() + state.lockPeriod * 30 * 24 * 60 * 60 * 1000)
          : action.payload,
        // 30/360 basis need to check
      };
    case BOB_ACTIONS.SET_WITHDRAWAL:
      return { ...state, withdrawals: action.payload };
    case BOB_ACTIONS.SET_RECIPIENT_ADDRESS:
      return { ...state, recipientAddress: action.payload };
    case BOB_ACTIONS.SET_PROOF:
      return {...state, proof: action.payload};
    default:
      throw new Error("unknown action required");
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(bobReducer, initialState);

  // Page rendering
  function currentStep() {
    switch (state.step) {
      case 0:
        return <BobLandingPage />;
      case 1:
        return <AddressInputPage />;
      case 2:
        return <ConfirmAddressesPage />;
      case 3:
        if (state.status === "waiting") return <InheritanceAssetsPage />;
        if (state.status === "approved") return <InheritanceAssetsLockedPage />;
        if (state.status === "matured")
          return <InheritanceAssetsUnlockedPage />;
      case 4:
        if (state.status === "waiting") return <ZKProofGenerationPage />;
        if (state.status === "matured") return <TransferConfirmationPage />;
      case 5:
        if (state.status === "waiting") return <ZKProofConfirmationPage />;
        if (state.status === "matured") return <TransferResultPage />;
      case 6:
        if (state.status === "waiting") return <ApplicationResultPage />;
      default:
        throw new Error("unknown step required");
    }
  }

  return (
    <BobContext.Provider value={{ state, dispatch }}>
      {currentStep()}
    </BobContext.Provider>
  );
}
