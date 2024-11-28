import "../app/globals.css"; // グローバルなCSSをインポート
import type { AppProps } from "next/app";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { PostProvider } from "@/app/postContext";
import { anvil, baseSepolia } from "viem/chains";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [baseSepolia, anvil],
    transports: {
      // RPC URL for each chain
      [baseSepolia.id]: http(),
      [anvil.id]: http(),
    },
    ssr: true,

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <PostProvider>
            <Component {...pageProps} />
          </PostProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
