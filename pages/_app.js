import { useState, useEffect } from "react";
import Script from "next/script";
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
//import function to get nftData
import { getAllUserNFTs } from "../helpers/NFTHelper";
import rarityMap from "../public/files/rarityMap.json";

const MyApp = ({ Component, pageProps }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [user, setUser] = useState(null);
  const [userNFTData, setUserNFTData] = useState(null);

  const connectWallet = async () => {
    let userInfo = await connectWalletThruModel();
    setUser(userInfo);
    if (userInfo?.provider) {
      await connectToProviderEvents(userInfo.provider);
    }
    if (account) {
      setAccount(account);
    }
    if (chainId) {
      setChainId(chainId);
    }
    if (userInfo?.chainId === 250) {
      let userData = await getAndSetUserNFTData(
        userInfo?.provider,
        userInfo?.account,
        rarityMap
      );
      setUserNFTData(userData);
    }

    return;
  };

  const connectToProviderEvents = async (provider) => {
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (cId) => {
      let c = await getChainIdFromString(provider);
      setChainId(c);
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      // console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      // console.log(error);
    });
  };

  const disconnectWallet = async () => {
    try {
      let web3Modal = getWeb3Modal();
      web3Modal.clearCachedProvider();
      clearUserData();
    } catch (err) {
      // console.log("Error Disconnecting", err);
    }
  };

  const clearUserData = () => {
    setAccount(null);
    setChainId(null);
    setUser(null);
  };

  const getAndSetUserNFTData = async (provider, account, rarityMap) => {
    let userData = await getAllUserNFTs(provider, account, rarityMap);
    return userData;
  };

  useEffect(() => {
    setUser({ ...user, chainId });
    if (user && chainId === 250) {
      (async () => {
        let userData = await getAndSetUserNFTData(
          user?.provider,
          user?.account,
          rarityMap
        );
        setUserNFTData(userData);
      })();
    }
  }, [chainId]);

  useEffect(() => {
    setUser({ ...user, account });
    if (user && account && user?.chainId === 250) {
      (async () => {
        let userData = await getAndSetUserNFTData(
          user?.provider,
          account,
          rarityMap
        );
        setUserNFTData(userData);
      })();
    }
  }, [account]);

  useEffect(() => {
    let web3Modal = getWeb3Modal();
    if (web3Modal.cachedProvider) {
      const connect = async () => {
        await connectWallet();
      };
      connect().catch((err) => console.log("Error connecting: ", err));
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
      </Script>
      <UserContext.Provider
        value={{
          user,
          userNFTData,
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
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
      />
    </>
  );
};

export default MyApp;
