import React from "react";
import Waves from "./Waves";

const NftPageViewWrapper = ({ children }) => {
  return (
    <div className="mint-page relative flex">
      <Waves fillColor="#fedf87" className="editorial-fixed" />
      <div className="flex justify-center items-center place-items-center w-full my-16">
        <div
          id="main"
          className="w-full flex flex-col items-center justify-center"
        >
          <header className="text-center w-10/12 mb-3">
            <h1 className="font-freckle text-4xl md:text-6xl main-title-text">
              Fantom{" "}
              <span className="main-title-text-secondary">Alpha Fiendz</span>
            </h1>
          </header>
          <div className="fiendz-card-container w-5/6 lg:m-3 relative justify-center flex flex-col bg-white items-center lg:w-8/12">
            <div className="flex items-center w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftPageViewWrapper;
