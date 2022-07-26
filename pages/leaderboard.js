import React, { useState, useEffect, useContext } from "react";
import SEOMeta from "../components/SEOMeta";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import connectMongo from "../lib/connectMongo";
import LeaderboardModel from "../models/Leaderboard";

export async function getServerSideProps(context) {
  await connectMongo();
  let leaderboardRecords = await LeaderboardModel.find().sort({
    walletScore: "descending",
  });
  return {
    props: { scores: JSON.parse(JSON.stringify(leaderboardRecords)) }, // will be passed to the page component as props
  };
}

const SEOdesc = "Check wallet score leaderboard! Are you in the lead??";

const Leaderboard = ({ scores }) => {
  const { user, userNFTData } = useContext(UserContext);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState(scores);

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
        formattedAccount = `${account.substring(0, 17)}....${account.substring(
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
    let c = "#1d1f91";
    switch (rank) {
      case 3:
        c = "#f3755a";
        break;
      case 2:
        c = "#786bf4";
        break;
      case 1:
        c = "#f1b210";
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

  return (
    <div>
      <SEOMeta description={SEOdesc} path="/leaderboard" page="Leaderboard" />
      <div className="mint-page relative flex justify-center">
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
                      {scores?.length > 1 ? scores[1].walletScore : "N/A"}
                    </span>
                  </h6>
                  <p className="font-inter text-border lg:text-lg">
                    {scores?.length > 1
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
                        {scores?.length > 0 ? scores[0].walletScore : "N/A"}
                      </span>
                    </h6>
                    <p className="font-inter text-border lg:text-lg">
                      {scores?.length > 0
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
                      {scores?.length > 2 ? scores[2].walletScore : "N/A"}
                    </span>
                  </h6>
                  <p className="font-inter text-border lg:text-lg">
                    {scores?.length > 2
                      ? formatAccount(scores[2].account, "rank")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <div
              id="leaderboard"
              className="bg-white flex flex-col w-11/12 md:w-9/12  md:px-4 wallet-stats items-center mb-2 p-4"
            >
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-freckle text-xl md:text-3xl text-border">
                      Rank
                    </th>
                    <th className="font-freckle text-xl md:text-3xl text-border">
                      Address
                    </th>
                    <th className="font-freckle text-xl md:text-3xl text-border text-center">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData?.map((score) => {
                    return (
                      <tr
                        className={`font-freckle text-xl lg:text-2xl text-border w-full  ${
                          score.account === user?.account
                            ? "bg-userlb"
                            : "bg-white"
                        }`}
                        key={score.account}
                      >
                        <td
                          style={{
                            color: `${getRankColorClass(
                              scores.indexOf(score) + 1
                            )}`,
                          }}
                        >{`#${scores.indexOf(score) + 1}`}</td>
                        <td className="font-inter text-lg lg:text-2xl hidden md:block">
                          {score.account &&
                            formatAccount(score?.account, "table")}
                        </td>
                        <td className="font-inter text-lg md:hidden">
                          {score.account &&
                            formatAccount(score?.account, "rank")}
                        </td>
                        <td className="text-center text-lg lg:text-2xl text-orange-500">
                          {score.walletScore}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
