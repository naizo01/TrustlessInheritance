
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
    name: "Convertible JPY Token",
    symbol: "USDT",
    decimals: 18,
    logoURL: "/tokens/CJPY.png",
    type: "ERC20",
    address : "0x0",
    price: 1,
  },
  {
    name: "Convertible JPY Token",
    symbol: "USDC",
    decimals: 18,
    logoURL: "/tokens/CJPY.png",
    type: "ERC20",
    address : "0x0",
    price: 1,
  },
];