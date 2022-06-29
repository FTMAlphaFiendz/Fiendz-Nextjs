import React, { useState, useEffect, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export async function getServerSideProps(context) {
  let { data } = await axios.get(
    "http://localhost:3000/api/leaderboard/getLeaderboardScores",
    {
      headers: { secret: process.env.FAFZ_SECRET },
    }
  );

  return {
    props: { scores: data }, // will be passed to the page component as props
  };
}

const SEOdesc = "Check wallet score leaderboard! Are you in the lead??";

const Leaderboard = ({ scores }) => {
  const { user, userNFTData } = useContext(UserContext);
  const [userRegistration, setUserRegistration] = useState(null);
  const registerWallet = async (account, userNFTData) => {
    console.log({ account, walletScore });
    let body = {};
    return;
    let registerRecord = await axios.post(
      `http://localhost:3000/api/leaderboard/`,
      { headers: { secret: process.env.NEXT_PUBLIC_FAFZ_SECRET } }
    );
    console.log(registerRecord);
  };

  const checkUserRegistration = async (account) => {
    account = "0xa11";
    let userRecord = await axios.get(
      `http://localhost:3000/api/leaderboard/${account}`,
      { headers: { secret: process.env.NEXT_PUBLIC_FAFZ_SECRET } }
    );
    if (!userRecord) return null;
    return userRecord.data;
  };
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, [userNFTData]);

  useEffect(() => {
    if (user?.account) {
      (async () => {
        let userReg = await checkUserRegistration(user?.account);
        console.log({ userReg });
        userReg.displayName = null;
        setUserRegistration(userReg);
      })();
    }
  }, [user?.account]);
  return (
    <div>
      <SEOMeta description={SEOdesc} path="/leaderboard" page="Leaderboard" />
      <div className="mint-page relative flex">
        <div className="w-full mt-16 md:mt-20 mx-10">
          <header className="flex justify-center mb-4 lg:mt-8">
            <h1 className="text-white font-inter text-3xl">Leaderboard</h1>
          </header>
          <div className="flex flex-col items-center w-full">
            <div
              id="leaderboard"
              className="bg-white bg-opacity-50 flex flex-col w-11/12 md:w-8/12  md:px-4 wallet-stats items-center mb-2 p-4"
            >
              <div
                id="register-wallet"
                className="flex w-full justify-between items-center"
              >
                <div>
                  <button
                    className="p-3 sm:ml-2 hover:shadow-xl duration-500 hover:text-white font-freckle w-full check-whitelist-btn button-border"
                    onClick={() =>
                      registerWallet(user?.account, userNFTData?.walletScore)
                    }
                  >
                    Register Wallet
                  </button>
                </div>
                <div className="w-7/12">
                  {userRegistration ? (
                    <ul>
                      <li className="text-border font-freckle">
                        <span>Whats up,</span>
                        {userRegistration?.displayName
                          ? userRegistration?.displayName
                          : user?.account.substring(0, 4)}
                      </li>
                      <li className="text-border font-freckle">
                        <span>Wallet Score:</span>{" "}
                        {userRegistration?.walletScore}
                      </li>
                      <li className="text-border font-freckle">
                        <span>Last updated:</span> {userRegistration?.updatedAt}
                      </li>
                    </ul>
                  ) : (
                    <p>not registered</p>
                  )}
                </div>
              </div>
              <div className="w-full my-4 px-2">
                <div className="w-full flex justify-between">
                  <div>
                    <h2 className="text-2xl font-freckle text-border">
                      Account
                    </h2>
                  </div>
                  <div>
                    <h2 className="text-2xl font-freckle text-border">
                      Wallet Score
                    </h2>
                  </div>
                </div>
                <div id="scores" className="w-full my-4">
                  {scores?.map((score) => {
                    return (
                      <div className="w-full flex justify-between my-2">
                        <div>
                          <h2 className="text-xl font-freckle text-border">
                            {score.account}
                          </h2>
                        </div>
                        <div>
                          <h2 className="text-xl font-freckle text-border">
                            {score.walletScore}
                          </h2>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
