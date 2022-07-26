import React, { useState, useEffect, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import {
  registerUserWallet,
  getLeaderboardScores,
  checkUserRegistration,
} from "../helpers/LeaderboardHelper";
import { getUrl } from "../helpers/utils";

export async function getServerSideProps(context) {
  let baseUrl = "http://localhost:3000";
  if (process.env.VERCEL_URL) {
    baseUrl = process.env.VERCEL_URL;
  }
  let { data } = await axios.get(
    `${baseUrl}/api/leaderboard/getLeaderboardScores`,
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

  const formatAccount = (account, type) => {
    let formattedAccount;
    switch (type) {
      case "rank":
        formattedAccount = `${account.substring(0, 5)}....${account.substring(
          36,
          42
        )}`;
        break;
      case "table":
        formattedAccount = `${account.substring(0, 10)}....${account.substring(
          33,
          42
        )}`;
        break;
      default:
        throw "No contract for this type";
    }
    return formattedAccount;
  };

  const getRankColorClass = (rank) => {
    let c = "text-border";
    switch (rank) {
      case 3:
        c = "text-third";
        break;
      case 2:
        c = "text-second";
        break;
      case 1:
        c = "text-first";
        break;
      default:
        c = c;
    }
    return c;
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
        // let userReg = await checkUserRegistration(user?.account);
        // setUserRegistration(userReg);
      })();
    }
  }, [user?.account]);

  return (
    <div>
      <SEOMeta description={SEOdesc} path="/leaderboard" page="Leaderboard" />
      <div className="mint-page relative flex">
        <div className="w-full mt-16 md:mt-20 mx-10">
          <header className="flex justify-center mb-4 lg:mt-8">
            <h1 className="font-freckle text-5xl md:text-7xl text-border page-title">
              Leaderboard
            </h1>
          </header>
          <div className="hidden md:flex flex-col items-center w-full">
            <div className="my-8 flex justify-center w-11/12  items-end">
              <div className="bg-white w-3/12 flex flex-col mx-3 items-center nft-border ">
                <img src="/images/ranks/ranking2.png" className="w-8/12 my-4" />
                <div className="mb-6 flex flex-col items-center w-full">
                  <h6 className="font-freckle text-border text-xl text-center">
                    Score:{" "}
                    <span className="text-orange-500">
                      {scores.length > 1 ? scores[1].walletScore : "N/A"}
                    </span>
                  </h6>
                  <p className="font-inter text-border lg:text-lg">
                    {scores.length > 1
                      ? formatAccount(scores[1].account, "rank")
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="bg-white w-3/12 mx-3 nft-border flex justify-center">
                <div className="flex flex-col mx-3 items-center justify-start w-full h-full">
                  <img
                    src="/images/ranks/ranking1.png"
                    className="w-8/12 my-14"
                  />
                  <div className="mb-6 flex flex-col items-center w-full ">
                    <h6 className="font-freckle text-border text-xl text-center">
                      Score:{" "}
                      <span className="text-orange-500">
                        {scores.length > 0 ? scores[0].walletScore : "N/A"}
                      </span>
                    </h6>
                    <p className="font-inter text-border lg:text-lg">
                      {scores.length > 0
                        ? formatAccount(scores[0].account, "rank")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white w-3/12 flex flex-col mx-3 items-center nft-border ">
                <img src="/images/ranks/ranking3.png" className="w-8/12 my-4" />
                <div className="mb-6 flex flex-col items-center w-full">
                  <h6 className="font-freckle text-border text-xl text-center">
                    Score:{" "}
                    <span className="text-orange-500">
                      {scores.length > 2 ? scores[2].walletScore : "N/A"}
                    </span>
                  </h6>
                  <p className="font-inter text-border lg:text-lg">
                    {scores.length > 2
                      ? formatAccount(scores[2].account, "rank")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            {/* <div
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
              </div> */}
            <div
              id="leaderboard"
              className="bg-white flex flex-col w-10/12 md:w-9/12  md:px-4 wallet-stats items-center mb-2 p-4"
            >
              {/* <div className="w-full my-4 px-2">
                <div className="w-full flex justify-between">
                  <div>
                    <h2 className="text-lg md:text-2xl font-freckle text-border">
                      Rank
                    </h2>
                  </div>
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
                  {leaderboardData?.map((score, i) => {
                    return (
                      <div
                        className={`w-full flex justify-between my-2  ${
                          score.account === user?.account
                            ? "text-orange-500"
                            : "text-border"
                        }`}
                        key={score.account}
                      >
                        <div className={`${getRankColorClass()}`}>
                          <h2 className="text-xl font-freckle ">{`#${
                            i + 1
                          }`}</h2>
                        </div>
                        <div>
                          <h2 className="text-xl font-freckle ">
                            {score.account &&
                              formatAccount(score?.account, "table")}
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
              </div> */}
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-freckle text-xl text-border">Rank</th>
                    <th className="font-freckle text-xl text-border">
                      Address
                    </th>
                    <th className="font-freckle text-xl text-border text-center">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData?.map((score, i) => {
                    return (
                      <tr
                        className={`font-freckle text-xl text-border w-full  my- ${
                          score.account === user?.account
                            ? "text-orange-500"
                            : "text-border"
                        }`}
                        key={score.account}
                      >
                        <td>{`#${i + 1}`}</td>
                        <td className="font-inter text-lg">
                          {score.account &&
                            formatAccount(score?.account, "table")}
                        </td>
                        <td className="text-center">{score.walletScore}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="fixed bottom-0 w-full h-12">
          <div className="w-full flex justify-end">
            <div className="w-full md:w-2/12 bg-white m-3 nft-border p-3">
              <p className="font-freckle text-border text-base md:text-sm">
                Wanna check your score on the leaderboard?!
              </p>
              <div className="mt-3">
                <button
                  className="p-3 hover:shadow-xl duration-500 hover:text-white font-freckle w-full check-whitelist-btn button-border"
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
              {userRegistration && (
                <div className="text-center mt-1">
                  <p className="font-inter text-border text-sm">
                    {formatDate(userRegistration?.updatedAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Leaderboard;
