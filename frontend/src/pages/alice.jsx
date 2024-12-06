"use client"; // Next.jsでクライアント側でのみ実行することを指定

// 必要なReactフックとコンポーネントをインポートします
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useAccount } from "wagmi";
import { assets } from "@/lib/token";
import { usePosts } from "@/app/postContext";
import useBalanceOf from "@/hooks/useBalanceOf";
import useOwnerToProxy from "@/hooks/useOwnerToProxy";
import { getProxyInfo, convertToDummyTransaction } from "@/hooks/getProxyInfo";

// 各ページコンポーネントをインポート
//import BobLandingPage from "@/components/bob-landing-page";
import LockPeriodSetting from "@/components/alice-lock-period-setting";
import SecretInput from "@/components/alice-secret-input";
import InheritanceAssetSelection from "@/components/alice-inheritance-asset-selection.jsx";
import InheritanceStatus from "@/components/alice-inheritance-status.jsx";
import SubLandingPage from "@/components/alice-landing-page";
import InheritanceAssetConfirmation from "@/components/alice-inheritance-asset-confirmation";
import InheritanceRegistrationReport from "@/components/alice-inheritance-registration-report";
import InheritanceCancellationResult from "@/components/alice-inheritance-cancellation-result";

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
  status: "new", // new, registered, submitted
  deceasedAddress: "", // use useAddress; it's more reliable
  lockEndDate: null, // excluding this date
  lockPeriod: null, // num of months
  assets: [], // asset holding
  granted: [], // asset granted
  secret: "", // secret
  proof: {}, // proof
  proxyAddress: "", // proxy's address
};

// アクションタイプを定義します（状態を更新する際に使用）
export const ALICE_ACTIONS = {
  MOVE_FORWARD: "MOVE_FORWARD",
  MOVE_BACKWARD: "MOVE_BACKWARD",
  MOVE_SPECIFIC: "MOVE_SPECIFIC",
  SET_DECEASED_ADDRESS: "SET_DECEASED_ADDRESS",
  SET_LOCK_END_DATE: "SET_LOCK_END_DATE",
  SET_LOCK_PERIOD: "SET_LOCK_PERIOD",
  SET_ASSETS: "SET_ASSETS",
  SET_SUBMITTED: "SET_SUBMITTED",
  SET_GRANTED: "SET_GRANTED",
  SET_REGISTERED: "SET_REGISTERED",
  SET_SECRET: "SET_SECRET",
  SET_PROOF: "SET_PROOF",
  SET_PROXY_ADDRESS: "SET_PROXY_ADDRESS",
  RESET_STATE: "RESET_STATE",
};

// Reducerを定義: 現在の状態とアクションに基づいて新しい状態を返します
function aliceReducer(state, action) {
  switch (action.type) {
    case ALICE_ACTIONS.MOVE_FORWARD:
      return { ...state, step: state.step + 1 };
    case ALICE_ACTIONS.MOVE_BACKWARD:
      return { ...state, step: state.step - 1 };
    case ALICE_ACTIONS.MOVE_SPECIFIC:
      return { ...state, step: action.payload };
    case ALICE_ACTIONS.SET_DECEASED_ADDRESS:
      return { ...state, deceasedAddress: action.payload };
    case ALICE_ACTIONS.SET_ASSETS:
      return { ...state, assets: action.payload };
    case ALICE_ACTIONS.SET_GRANTED:
      return { ...state, granted: action.payload };
    case ALICE_ACTIONS.SET_LOCK_PERIOD:
      return { ...state, lockPeriod: action.lockPeriod };
    case ALICE_ACTIONS.SET_REGISTERED:
      return { ...state, status: "registered" };
    case ALICE_ACTIONS.SET_SUBMITTED:
      return { ...state, status: "submitted" };
    case ALICE_ACTIONS.SET_PROOF:
      return { ...state, proof: action.payload };
    case ALICE_ACTIONS.SET_PROXY_ADDRESS:
      return { ...state, proxyAddress: action.payload };
    case ALICE_ACTIONS.SET_LOCK_END_DATE:
      return {
        ...state,
        lockEndDate: !action.payload
          ? new Date(Date.now() + state.lockPeriod * 1000) // lockPeriodをUNIXタイムスタンプとして使用
          : new Date(action.payload * 1000),
        // 30/360 basis need to check
      };
    case ALICE_ACTIONS.SET_SECRET:
      return { ...state, secret: action.payload };
    case ALICE_ACTIONS.RESET_STATE:
      return { ...initialState };
    default:
      throw new Error("unknown action required");
  }
}

// メインのコンポーネント
export default function Home() {
  // useReducerを使用して状態と更新関数を取得
  const [state, dispatch] = useReducer(aliceReducer, initialState);

  const { address: userAddress } = useAccount();
  const { data: balances } = useBalanceOf(userAddress, assets);
  const { data: proxyAddresses } = useOwnerToProxy(userAddress);
  const { setWallet, setNetwork } = usePosts();

  useEffect(() => {
    if (balances) {
      const newTokens = {};
      assets.forEach((token, index) => {
        const balance = balances ? balances[index] : null;
        const balanceString = balance?.result ? String(balance.result) : "0";
        // if (balanceString !== "0") newTokens[token.symbol] = balanceString;
        newTokens[token.symbol] = balanceString;
      });
      setWallet([{ address: userAddress, tokens: newTokens }]);
    }
  }, [balances]);

  // Proxyがない場合に、dummy dataが残らないようにする
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true") setNetwork([]);

  useEffect(() => {
    const fetchProxyInfos = async () => {
      if (proxyAddresses && proxyAddresses.length > 0) {
        const infos = [];
        await Promise.all(
          proxyAddresses.map(async (address, index) => {
            const info = await getProxyInfo(address);
            const convetInfo = convertToDummyTransaction(info, index + 1);
            infos.push(convetInfo);
          })
        );
        setNetwork(infos);
        dispatch({
          type: ALICE_ACTIONS.SET_PROXY_ADDRESS,
          payload: infos.at(-1).proxyAddresses,
        });
      }
    };
    fetchProxyInfos();
  }, [proxyAddresses]);


  // 現在のステップに基づいて適切なページコンポーネントを返す関数
  function currentStep() {
    switch (state.step) {
      case 0:
        return <SubLandingPage />;
      case 1:
        if (state.status === "new") return <LockPeriodSetting />;
        //if (state.status !== "new") return <LockPeriodSetting />;
        if (state.status !== "new") return <InheritanceStatus />;
      case 2:
        return <SecretInput />;
      case 3:
        return <InheritanceAssetSelection />;
      case 4:
        return <InheritanceAssetConfirmation />;
      case 5:
        return <InheritanceRegistrationReport />;
      case 100:
        return <InheritanceCancellationResult />;
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
