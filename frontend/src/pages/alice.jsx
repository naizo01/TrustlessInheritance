"use client"; // Next.jsでクライアント側でのみ実行することを指定

// 必要なReactフックとコンポーネントをインポートします
import { useState, createContext, useContext, useReducer } from "react";

// 各ページコンポーネントをインポート
import { InheritanceUi } from "@/components/inheritance-ui";
//import BobLandingPage from "@/components/bob-landing-page";
import LockPeriodSetting from "@/components/alice-lock-period-setting";
import SecretInput from "@/components/alice-secret-input";
import InheritanceAssetSelection from "@/components/alice-inheritance-asset-selection";
import InheritanceStatus from "@/components/alice-inheritance-status";
import { PostProvider, usePosts } from "@/app/postContext";

// Aliceのデータを管理するためのContextを作成します
export const AliceContext = createContext(null);

// カスタムフック: AliceContextの値を簡単に取得するために使用します
export const useAliceState = () => {
  const context = useContext(AliceContext);
  if (!context)
    throw new Error("useAliceState must be used within a AliceProvider");
  return context;
};

// アプリケーションの初期状態を定義
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

// アクションタイプを定義します（状態を更新する際に使用）
export const ALICE_ACTIONS = {
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

// Reducerを定義: 現在の状態とアクションに基づいて新しい状態を返します
function aliceReducer(state, action) {
  switch (action.type) {
    case ALICE_ACTIONS.MOVE_FORWARD:
      return { ...state, step: state.step + 1 };
    case ALICE_ACTIONS.MOVE_SPECIFIC:
      return { ...state, step: action.payload };
    case ALICE_ACTIONS.SET_DECEASED_ADDRESS:
      return { ...state, deceasedAddress: action.payload };
    case ALICE_ACTIONS.SET_INHERITOR_ADDRESS:
      return { ...state, inheritorAddress: action.payload };
    case ALICE_ACTIONS.SET_ASSETS:
      return { ...state, assets: action.payload };
    case ALICE_ACTIONS.SET_LOCK_PERIOD:
      return { ...state, lockPeriod: action.payload };
    case ALICE_ACTIONS.SET_APPROVAL:
      return { ...state, status: "approved" };
    case ALICE_ACTIONS.SET_MATURED:
      return { ...state, status: "matured" };
    case ALICE_ACTIONS.SET_LOCK_END_DATE:
      return {
        ...state,
        lockEndDate: !action.payload
          ? new Date(Date.now() + state.lockPeriod * 30 * 24 * 60 * 60 * 1000)
          : action.payload,
        // 30/360 basis need to check
      };
    case ALICE_ACTIONS.SET_WITHDRAWAL:
      return { ...state, withdrawals: action.payload };
    case ALICE_ACTIONS.SET_RECIPIENT_ADDRESS:
      return { ...state, recipientAddress: action.payload };
    case ALICE_ACTIONS.SET_PROOF:
      return {...state, proof: action.payload};
    default:
      throw new Error("unknown action required");
  }
}

// メインのコンポーネント
export default function Home() {
  // useReducerを使用して状態と更新関数を取得
  const [state, dispatch] = useReducer(aliceReducer, initialState);

  // 現在のステップに基づいて適切なページコンポーネントを返す関数
  function currentStep() {
    switch (state.step) {
      case 0:
        return <LockPeriodSetting />;
      case 1:
        return <SecretInput />;
      case 2:
        return <InheritanceAssetSelection />;
      case 3:
        return <InheritanceStatus />;
      default:
        throw new Error("unknown step required");
    }
  }

  return (
    <AliceContext.Provider value={{ state, dispatch }}>
      {currentStep()}
    </AliceContext.Provider>
  );
}