import { useState, useEffect } from "react";
import Layout from "../components/sections/Layout";
import { UserContext } from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  connectWalletThruModel,
  getWeb3Modal,
  getChainIdFromString,
} from "../helpers/Web3Client";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

const MyApp = ({ Component, pageProps }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    let userInfo = await connectWalletThruModel();
    let { provider, account, chainId } = userInfo;
    if (provider) {
      setProvider(provider);
      await connectToProviderEvents(provider);
    }
    if (account) {
      setAccount(account);
    }
    if (chainId) {
      setChainId(chainId);
    }
    return;
  };

  const connectToProviderEvents = async (provider) => {
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
      window.location.reload();
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (cId) => {
      let c = await getChainIdFromString(provider);
      setChainId(c);
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log("DISCONNECTING");
      console.log(error);
    });
  };

  const disconnectWallet = async () => {
    try {
      let web3Modal = getWeb3Modal();
      web3Modal.clearCachedProvider();
      clearUserData();
    } catch (err) {
      console.log("Error Disconnecting", err);
    }
  };

  const clearUserData = () => {
    setAccount(null);
    setProvider(null);
    setChainId(null);
  };

  useEffect(() => {
    let web3Modal = getWeb3Modal();
    console.log(process.env.PUBLIC_NEXT_MORALIS_URL);
    console.log(process.env.PUBLIC_NEXT_MORALIS_APP_ID);
    if (web3Modal.cachedProvider) {
      const connect = async () => {
        await connectWallet();
      };
      connect().catch((err) => console.log("Error connecting: ", err));
    }
  }, []);

  return (
    <>
      <MoralisProvider
        serverUrl={process.env.PUBLIC_NEXT_MORALIS_URL}
        appId={process.env.PUBLIC_NEXT_MORALIS_APP_ID}
      >
        <UserContext.Provider
          value={{
            account,
            chainId,
            provider,
            connectWallet,
            disconnectWallet,
            getWeb3Modal,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
        <ToastContainer
          position="bottom-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
      </MoralisProvider>
    </>
  );
};

export default MyApp;
