import { useState, useEffect } from "react";
import Layout from "../components/sections/Layout";
import { ToastContainer } from "react-toastify";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, WagmiConfig } from "wagmi";
import { chains, wagmiClient } from "../helpers/WalletHelper";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

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
            initialChain={chains.fantom}
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
