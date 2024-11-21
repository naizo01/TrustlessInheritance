
interface Asset {
  name: string;
  symbol: string;
  decimals: number;
  logoURL: string;
  type: string;
  address: string;
  price: number;
}


const assets: Asset[] = [
  {
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    logoURL: "/logo/usdt.png",
    type: "ERC20",
    address : "0x0",
    price: 1,
  },
  {
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    logoURL: "/logo/usdc.png",
    type: "ERC20",
    address : "0x0",
    price: 1,
  },
];