import { createContext, useContext, useState } from "react";

// context
const PostContext = createContext(null);

// demo data
// for bob
const dummyTransactions = [
  // 承認手続き前の取引
  {
    id: 1,
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    tokens: {
      ETH: "20000000000000000000",
      USDT: "1000000000",
      USDC: "3000000000",
      DAI: "2000000000000000000000",
    },
    lockEndDate: null,
    lockPeriod: 3, // matured transaction
    secret: "3時のおやつはババロア", // 実際はhash化されている
  },
  // 承認手続きが行われ、ロック期間中の取引
  {
    id: 2,
    address: "0xB8A1726abC8b984c60DD400370AA846705175c4D",
    tokens: {
      ETH: "20000000000000000000",
      USDT: "1200000000",
      USDC: "1500000000",
      DAI: "1000000000000000000000",
    },
    lockEndDate: new Date(2024, 10, 1), // Nov 01, 2024 -- base 0
    lockPeriod: 3, // matured transaction
    secret: "3時のおやつカンパニー", // 実際はhash化されている
  },
  // 承認手続きが行われ、ロック期間満了の取引
  {
    id: 3,
    address: "0x1e290652CaeDF92cf430DCa1c5B6faC90F4A13D9",
    tokens: {
      ETH: "18000000000000000000",
      USDT: "1250000000",
      USDC: "2500000000",
      DAI: "1180000000000000000000",
    },
    lockEndDate: new Date(2024, 11, 25), // Dec 25, 2024 -- base 0
    lockPeriod: 3, // approved but not matured transaction
    secret: "鈴木一郎が同級生", // 実際はhash化されている
  },
];

// これから相続手続きが行われる予定のblance
// for alice
const dummyPositions = [
  {
    address: "0xE0F189CfdCfeda40A28dc577D7c26C2Ad6CeeB6A",
    token: {
      ETH: "10000000000000000000",
      USDT: "1000000000",
      USDC: "1000000000",
      DAI: "1000000000000000000000",
    },
  },
  {
    address: "0x0", // Replace with a valid eth address
    token: {
      ETH: "10000000000000000000",
      USDT: "1000000000",
      USDC: "1000000000",
      DAI: "1000000000000000000000",
    },
  },
];

function PostProvider({ children }) {
  const [positions, setPositions] = useState(dummyPositions);
  const [transactions, setTransactions] = useState(dummyTransactions);

  return (
    <PostContext.Provider
      value={{ positions, setPositions, transactions, setTransactions }}
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
