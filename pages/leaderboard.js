import React, { useState, useEffect, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import {
  registerUserWallet,
  getLeaderboardScores,
  checkUserRegistration,
} from "../helpers/LeaderboardHelper";

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
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState(scores);

  const registerWallet = async (account, walletScore) => {
    let data = await registerUserWallet(account, walletScore);
    setUserRegistration(data);
    setIsLeaderboardLoading(true);
    let leaderboardScores = await getLeaderboardScores();
    setLeaderboardData(leaderboardScores);
  };

  const formatAccount = (account) => {
    return `${account.substring(0, 3)}....${account.substring(37, 42)}`;
  };

  const formatDate = (date) => {
    let splitDate = date.split("T");
    let ymd = splitDate[0];
    let hms = splitDate[1].substring(0, 8);
    return `${ymd} ${hms} UTC`;
  };

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", appHeight);
    appHeight();
  }, []);

  useEffect(() => {
    if (user?.account) {
      (async () => {
        let userReg = await checkUserRegistration(user?.account);
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
                className="flex flex-col-reverse md:flex-row w-full justify-between items-center"
              >
                <div>
                  <button
                    className="p-3 sm:ml-2 hover:shadow-xl duration-500 hover:text-white font-freckle w-full check-whitelist-btn button-border"
                    onClick={async () => {
                      await registerWallet(
                        user?.account,
                        userNFTData?.totalWallet
                      );
                    }}
                  >
                    Register Wallet
                  </button>
                </div>
                <div className="w-full text-center md:w-7/12 mb-3 text-lg md:text-base">
                  {userRegistration ? (
                    <ul>
                      <li className="text-border font-freckle mb-1">
                        <span className="mr-2">Whats up,</span>
                        {userRegistration?.displayName
                          ? userRegistration?.displayName
                          : formatAccount(userRegistration?.account)}
                      </li>
                      <li className="text-orange-500 font-freckle mb-1">
                        <span className="text-border">Wallet Score:</span>{" "}
                        {userRegistration?.walletScore}
                      </li>
                      <li className="text-border font-freckle">
                        <span>Last updated:</span>{" "}
                        {formatDate(userRegistration?.updatedAt)}
                      </li>
                    </ul>
                  ) : (
                    <p className="text-border font-freckle text-base">
                      Make sure to register your wallet to join the
                      leaderboard!!
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full my-4 px-2">
                <div className="w-full flex justify-between">
                  <div>
                    <h2 className="text-lg md:text-2xl font-freckle text-border">
                      Account
                    </h2>
                  </div>
                  <div>
                    <h2 className="text-lg md:text-2xl font-freckle text-border">
                      Wallet Score
                    </h2>
                  </div>
                </div>
                <div id="scores" className="w-full my-4">
                  {leaderboardData?.map((score) => {
                    return (
                      <div
                        className={`w-full flex justify-between my-2  ${
                          score.account === user?.account
                            ? "text-orange-500"
                            : "text-border"
                        }`}
                        key={score.account}
                      >
                        <div>
                          <h2 className="text-xl font-freckle ">
                            {score.account && formatAccount(score?.account)}
                          </h2>
                        </div>
                        <div>
                          <h2 className="text-xl font-freckle">
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
