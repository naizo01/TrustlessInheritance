import { createContext, useContext, useState, useEffect } from "react";

// context
const PostContext = createContext(null);

// demo data
// for bob
const dummyTransactions = [
  // 承認手続き前の取引
  // tokensは、aliceがapprovedしたtoken
  {
    id: 1,
    ownerAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    tokens: {
      ETH: "12000000000000000000",
      USDT: "1000000000",
      USDC: "3000000000",
      DAI: "200000000000000000000000",
    },
    lockEndDate: null,
    lockPeriod: 3, // matured transaction
    secret: "3時のおやつはババロア", // 実際はhash化されている
  },
  // 承認手続きが行われ、ロック期間満了の取引
  {
    id: 2,
    ownerAddress: "0xB8A1726abC8b984c60DD400370AA846705175c4D",
    tokens: {
      ETH: "5000000000000000000",
      USDT: "1200000000",
      USDC: "15000000",
      DAI: "1000000000000000000000",
    },
    lockEndDate: new Date(2024, 10, 1), // Nov 01, 2024 -- base 0
    lockPeriod: 3, // matured transaction
    secret: "3時のおやつカンパニー", // 実際はhash化されている
  },
  // 承認手続きが行われ、ロック期間中の取引
  {
    id: 3,
    ownerAddress: "0x1e290652CaeDF92cf430DCa1c5B6faC90F4A13D9",
    tokens: {
      ETH: "18000000000000000000",
      USDT: "1250000000",
      USDC: "25000000000",
      DAI: "1180000000000000000000",
    },
    lockEndDate: new Date(2024, 11, 25), // Dec 25, 2024 -- base 0
    lockPeriod: 3, // approved but not matured transaction
    secret: "鈴木一郎が同級生", // 実際はhash化されている
  },
];

// これから相続手続きが行われる予定のwalletに記録されるblance
// for alice
// aliceのwallet内のposition全て
const dummyPositions = [
  {
    address: "0xbc0C6ae768e9D2d5454055cd0997ff9f9C32dCAe", // my address 1
    tokens: {
      ETH: "10000000000000000000",
      USDT: "8000000000000000000000",
      USDC: "3300000000000000000",
      DAI: "1000000000000000000000",
      MKR: "50000000000000000000",
    },
    secret: null,
  },
  {
    address: "0xD0248721c8b65932b6Cdc9fffaeD94287C9BB222", // my address 2
    tokens: {
      ETH: "10000000000000000000",
      USDT: "1000000000000000000000",
      USDC: "250000000000000000000",
      DAI: "1000000000000000000000",
      WBTC: "100000000000000000000",
    },
    secret: null,
  },
  {
    address: "0x32CF6e0bDBec1DA0f4A047E5644f9EA6137D2b58", // my address 3
    tokens: {
      ETH: "2000000000000000000",
      USDT: "1000000000000000000000",
      USDC: "60000000000000000000",
      DAI: "80000000000000000000",
      AAVE: "2350000000000000000000",
    },
    secret: null,
  },
];

// networkに記録される相続取引記録
// for alice
// aliceが過去にapprovedしたtoken
const dummyNetworkRegistration = [
  {
    ownerAddress: "0xD0248721c8b65932b6Cdc9fffaeD94287C9BB222", // my address 2
    tokens: {
      ETH: "10000000000000000000", // usd33,475.30
      USDT: "1000000000000000000000",
      USDC: "250000000000000000000",
      WBTC: "100000000000000000000", // usd9,789.60
    },
    secret: "222",
    lockPeriod: "6",
    lockEndDate: null,
  },
  {
    ownerAddress: "0x32CF6e0bDBec1DA0f4A047E5644f9EA6137D2b58", // my address 3
    tokens: {
      ETH: "2000000000000000000",
      USDT: "1000000000000000000000",
      AAVE: "2350000000000000000000",
    },
    secret: "333",
    lockPeriod: "9",
    lockEndDate: new Date(2025, 7, 25), // Aug 25, 2025 -- base 0
  },
];

// my addressの状態 as of 2024/11/30
// my address 1: networkに登録なし
// my address 2: networkに登録あり、相続申請なし
// my address 3: networkに登録あり、相続申請あり
// aliceのページ変遷をデモデータで試す場合は、my address 1～3を、自分のwalletのアドレスに置き換えてください。

function PostProvider({ children }) {
  const [wallet, setWallet] = useState([]);
  const [network, setNetwork] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
      setWallet(dummyPositions);
      setNetwork(dummyNetworkRegistration);
      setTransactions(dummyTransactions);
    }
  }, []);
  const incrementRefresh = () => {
    setRefresh(!refresh);
  };
  return (
    <PostContext.Provider
      value={{
        wallet,
        setWallet,
        network,
        setNetwork,
        transactions,
        setTransactions,
        refresh,
        incrementRefresh,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("PostContest was used outside of the PostProvider");
  return context;
}

export { PostProvider, usePosts };
