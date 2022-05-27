import React from "react";
import Landing from "../components/sections/Landing";
import Community from "../components/sections/Community";
import Rarity from "../components/sections/Rarity";
import Roadmap from "../components/sections/Roadmap";
import TeamSection from "../components/sections/TeamSection";
import FAQ from "../components/sections/FAQ";
import Footer from "../components/sections/Footer";
import SEOMeta from "../components/SEOMeta";

const SEOdesc =
  "Home page displaying information regarding the FTM Alpha Fiendz NFT Project, " +
  "including collection information, team information, project roadmap and frequently asked questions.";

const Main = () => {
  return (
    <>
      <SEOMeta page="Home" description={SEOdesc} path="/" />
      <Landing />
      <Community />
      <Rarity />
      <Roadmap />
      <TeamSection />
      <FAQ />
      <Footer />
    </>
  );
};

export default Main;
