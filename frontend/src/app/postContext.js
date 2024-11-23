import { createContext, useContext, useState } from "react";

// context
const PostContext = createContext(null);

// demo data
const dummyTransactions = [
  {
    address: "0x0",
    tokens: {},
    lockPeriodEndDate: null,
    lockPeriod: 3,
  },
];

const dummyPositions = [
  {
    address: "0x0",
    token: {
      ETH: "100000000000",
      USDT: "200",
      USDC: "500",
      DAI: "100000",
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
