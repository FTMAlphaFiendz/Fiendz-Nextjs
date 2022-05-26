import React from "react";
import Landing from "../components/sections/Landing";
import Community from "../components/sections/Community";
import Rarity from "../components/sections/Rarity";
import Roadmap from "../components/sections/Roadmap";
import TeamSection from "../components/sections/TeamSection";
import FAQ from "../components/sections/FAQ";
import Footer from "../components/sections/Footer";

const Main = () => {
  return (
    <>
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
