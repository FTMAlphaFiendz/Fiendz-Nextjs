import React, { useState, useEffect, useContext } from "react";
import Waves from "./Waves";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";

const NftPageViewWrapper = ({ children }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [isPage, setIsPage] = useState(null);

  const getPath = () => {
    let currentPath;
    let path = router.asPath;
    switch (path) {
      case "/view":
        currentPath = "view";
        break;
      default:
        throw "No matching path found.";
    }
    return currentPath;
  };

  useEffect(() => {
    let currentPath = getPath();
    setIsPage(currentPath);
  }, []);

  return (
    <div className="mint-page relative flex">
      <Waves fillColor="#fedf87" className="editorial-fixed" />
      <div className="flex justify-center items-center place-items-center w-full my-16 md:my-20">
        <div
          id="main"
          className="w-full flex flex-col items-center justify-center z-10"
        >
          <div className="fiendz-card-container w-5/6 lg:m-3 relative justify-center flex flex-col bg-white items-center lg:w-8/12 ">
            <div className="flex items-center w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftPageViewWrapper;
