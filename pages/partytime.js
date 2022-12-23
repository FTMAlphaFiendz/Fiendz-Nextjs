import React from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

const partytime = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  return (
    <div className="mint-page flex justify-center items-center">
      <div className="text-white text-[4rem] md:text-[10rem] m-container w-[90%] md:w-[70%] lg:w-[50%] p-[2rem]">
        <div className="w-full h-full flex flex-col items-center gap-[2rem]">
          <h1 className="text-[3rem] md:text-[5rem]">Mint Title</h1>
          <p className="text-base sm:text-lg md:text-xl text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          {isConnected ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`link-button bg-white p-3  text-center flex items-center justify-center text-border m-2 button-border px-10`}
            >
              <span className="text-base sm:text-lg md:text-xl">
                Mint Party Pass
              </span>
            </motion.button>
          ) : (
            <span className="text-lg">
              <ConnectButton />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default partytime;
