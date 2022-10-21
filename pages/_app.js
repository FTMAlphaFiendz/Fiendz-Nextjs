import { useState, useEffect } from "react";
import Layout from "../components/sections/Layout";
import { ToastContainer } from "react-toastify";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const fantomChain = {
  id: 250,
  name: "Fantom",
  network: "fantom",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM",
  },
  rpcUrls: {
    default: "https://rpc.ankr.com/fantom/",
  },
  blockExplorers: {
    default: { name: "FTMScan", url: " https://ftmscan.com/" },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [chain.mainnet, fantomChain],
  [
    jsonRpcProvider({
      priority: 0,
      rpc: (chain) => {
        if (chain.id !== fantomChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "FAFZ",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const MyApp = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false);

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            initialChain={fantomChain}
            coolMode
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RainbowKitProvider>
        </WagmiConfig>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
        />
      </>
    );
  }
};

export default MyApp;
