import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import logoSmall from "../../public/images/titles/logo-small.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MenuButton from "../MenuButton";

const links = [
  { name: "FiendzMap", link: "roadmap" },
  { name: "Team", link: "team" },
  { name: "FAQs", link: "faqs" },
];

const nonHomeLinks = [
  { name: "Collection", link: "/collection" },
  { name: "Leaderboard", link: "/leaderboard" },
];

const Navbar = () => {
  const router = useRouter();
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
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, type: "spring", stiffness: 100 }}
        className="flex w-full lg:w-10/12 min-h-24 h-16 bg-white justify-around items-center lg:m-2 fixed lg:top-3 nav-custom shadow-xl py-2 lg:py-0"
      >
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
            className="text-3xl absolute text-black right-4 top-1 cursor-pointer lg:hidden font-bold text-[#1434A4] z-10"
          >
            <MenuButton menuOpen={open} />
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
                  <motion.div
                    key={link.link}
                    className="py-3 md:py-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ScrollLink
                      className="my-5 md:mx-5 cursor-pointer font-freckle md:text-sm md:text-base xl:text-lg text-border"
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
                  </motion.div>
                );
              })
            : nonHomeLinks.map((link) => {
                return (
                  <motion.div
                    key={link.link}
                    className="py-3 md:py-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {" "}
                    <Link href={link.link}>
                      <li
                        className="md:mx-5  cursor-pointer font-freckle md:text-sm md:text-base xl:text-lg text-border"
                        onClick={() => {
                          setOpen(!open);
                        }}
                      >
                        {link.name}
                      </li>
                    </Link>
                  </motion.div>
                );
              })}
          <motion.div
            className="py-3 md:py-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/view">
              <li
                className=" md:mx-5 cursor-pointer font-freckle md:text-sm md:text-base xl:text-lg text-border"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                NFTs
              </li>
            </Link>
          </motion.div>
          <li className="block sm:hidden pb-2 sm:pb-0">
            <ConnectButton
              accountStatus="full"
              chainStatus="icon"
              showBalance={false}
            />
          </li>
        </ul>
        <div className="flex flex-1 justify-end hidden sm:flex mr-[4rem] lg:mr-[2rem]">
          <ConnectButton
            accountStatus="full"
            chainStatus="icon"
            showBalance={false}
          />
        </div>
        {/* <NavigationMenu menuOpen={open} /> */}
      </motion.nav>
    </div>
  );
};

export default Navbar;

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/router";
// import { withTranslation } from "next-i18next";

const variants = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const pageLinks = [
  { title: "Portal", path: "", i18n: "portal" },
  { title: "Community", path: "/community", i18n: "community" },
  { title: "Gallery", path: "/gallery", i18n: "gallery" },
];

const NavigationMenu = ({ menuOpen, t }) => {
  const router = useRouter();
  return (
    <>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 2,
            },
          }}
          exit={{ opacity: 0 }}
          className={` fixed bg-black dark:bg-white transition ease-in-out absolute w-screen top-0 min-w-full md:pr-[20%] md:right-0 ${
            menuOpen ? "opacity-100" : "opacity-0 "
          } mt-[50px] overflow-hidden`}
        >
          <div className="flex flex-col h-full p-0 md:pl-[1rem] md:pt-[2rem]">
            <div className="h-[60vh] w-screen md:w-full flex items-center justify-center md:justify-start">
              <motion.ul
                variants={variants}
                initial="closed"
                animate={menuOpen ? "open" : "closed"}
                className="h-full flex flex-col justify-around"
              >
                {pageLinks.map((link, i) => (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    i={i}
                    key={i}
                    className={`text-[1rem] text-center md:text-left text-white dark:text-black cursor-pointer ${
                      router.pathname === link.path ? "italic underline" : ""
                    }`}
                  >
                    ${link.i18n}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

// export default NavigationMenu;
