import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "../../context/UserContext";
import logoSmall from "../../public/images/titles/logo-small.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import ConnectWalletBtn from "../ConnectWalletBtn";

const links = [
  { name: "About", link: "community" },
  { name: "Rarity/Perks", link: "rarity" },
  { name: "FiendzMap", link: "roadmap" },
  { name: "Team", link: "team" },
  { name: "FAQs", link: "faqs" },
];

const nonHomeLinks = [
  { name: "Back To Home", link: "/" },
  { name: "Token Checker", link: "/token-checker" },
];

const Navbar = () => {
  const router = useRouter();
  const { user, connectWallet, disconnectWallet } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);

  const getPath = () => {
    let home = isHome;
    let path = router.asPath;
    if (path !== "/") {
      home = false;
    } else {
      home = true;
    }
    return home;
  };

  useEffect(() => {
    let home = getPath();
    if (home && !isHome) {
      setIsHome(!isHome);
    } else if (!home && isHome) {
      setIsHome(!isHome);
    }
  }, [router, isHome]);

  return (
    <div className="flex flex-row justify-center">
      <nav className="flex w-full lg:w-10/12 min-h-24 h-16 bg-white justify-around items-center lg:m-2 fixed lg:top-3 nav-custom shadow-xl py-2 lg:py-0">
        <div className="ml-3 py-2 text-3xl font-bold font-bakbak flex flex-1 items-center">
          <div className="hover:drop-shadow-xl duration-500 hover:cursor-pointer ml-1 mb-1 absolute top-1 lg:top-2">
            <Link className="cursor-pointer" href="/">
              <Image
                className="small-logo"
                height={50}
                width={100}
                src={logoSmall}
                alt="Alpha Fiendz Logo Small"
              />
            </Link>
          </div>
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="text-3xl absolute text-black right-6 top-3 cursor-pointer lg:hidden font-bold text-[#1434A4] z-10"
          >
            {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </div>
        </div>
        <ul
          className={`lg:flex lg:items-center lg:pb-0 absolute lg:static bg-white lg:bg-transparent lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-14" : "-top-490"
          }`}
        >
          {isHome
            ? links.map((link) => {
                return (
                  <div key={link.link} className="py-3 md:py-0">
                    <ScrollLink
                      className="my-5 md:mx-5 link-effect cursor-pointer font-freckle md:text-sm md:text-base xl:text-lg text-border"
                      activeClass="active"
                      to={link.link}
                      spy={true}
                      smooth={true}
                      offset={0}
                      duration={800}
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      {link.name}
                    </ScrollLink>
                  </div>
                );
              })
            : nonHomeLinks.map((link) => {
                return (
                  <div key={link.name} className="py-3 md:py-0">
                    <Link href={link.link}>
                      <li
                        className="md:mx-5 link-effect cursor-pointer font-freckle md:text-sm md:text-base xl:text-lg text-border"
                        onClick={() => {
                          setOpen(!open);
                        }}
                      >
                        {link.name}
                      </li>
                    </Link>
                  </div>
                );
              })}
          <div className="py-3 md:py-0">
            <Link href="/view">
              <li
                className=" md:mx-5 link-effect cursor-pointer font-freckle md:text-sm md:text-base xl:text-lg text-border"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                My NFTs
              </li>
            </Link>
          </div>
          <li className="block sm:hidden pb-2 sm:pb-0">
            <ConnectWalletBtn
              account={user?.account}
              chainId={user?.chainId}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
            />
          </li>
        </ul>
        <div className="flex flex-1 justify-end hidden sm:flex">
          <ConnectWalletBtn
            account={user?.account}
            chainId={user?.chainId}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
