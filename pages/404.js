import React, { useEffect } from "react";
import NotFoundImage from "../public/images/misc/illustration-404.png";
import Link from "next/link";
import Image from "next/image";

const NotFoundPage = () => {
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
      <div className="flex flex-col mx-auto w-full justify-center items-center md:place-items-center overflow-hidden page-not-found-bg">
        <div className="flex flex-col items-center w-11/12 lg:w-6/12 mb-30 xl:mb-40 xl:mt-40">
          <div className="w-12/12 md:w-7/12 lg:w-6/12">
            <Image src={NotFoundImage} alt="Not Found" />
          </div>

          <h1 className="font-inter text-white nf-title text-lg md:text-2xl mb-3 text-center">
            Ooooops..... this page is not available
          </h1>
          <Link href="/">
            <button
              className={`link-button bg-white p-3 font-inter w-150 text-center flex items-center justify-center text-border m-2 button-border px-5`}
            >
              <span className="button-text">Back To Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
