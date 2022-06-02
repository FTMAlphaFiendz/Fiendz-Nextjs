import React, { useState } from "react";
import { AiOutlineCaretUp, AiFillCaretDown } from "react-icons/ai";
import Waves from "../Waves";

const FAQ = () => {
  const hiddenTexts = [
    {
      question: "What does FAFz mean?",
      answer:
        "FAFz is short for FTM Alpha Fiendz! The Fiendz is a Fantom Opera community that shares alpha primarily focused on Fantom related projects.",
    },
    {
      question: "What utility will FAFz have? ",
      answer:
        "FAFz is primarily a way to give back to the community that supported us and helped us make this collection possible. We will be launching staking in Potluck Protocol along with adding several community perks in the near future",
    },
    {
      question: "How many FAFz are there?",
      answer: "Our FAFz Genesis launch will consist of 777 Pieces.",
    },
    {
      question: "How much is mint for FAFz?",
      answer: "Mint will be 22 FTM.",
    },
    {
      question: "Wen Launch?",
      answer: "Soon! We are hoping to Launch June. Actual date and time TBA",
    },
  ];

  return (
    <div
      id="faqs"
      className="faq-bg flex flex-col mx-auto h-full w-full justify-center place-items-center"
    >
      <Waves fillColor="#80e2ff" />
      <div className="flex flex-col justify-center w-10/12 lg:w-8/12 lg:w-1/2 mb-32 lg:mb-20">
        <header className="mb-3 flex justify-center mt-40">
          <h1 className="font-freckle text-4xl md:text-7xl text-border page-title">
            FAQs
          </h1>
        </header>
        <Accordion faqQuestions={hiddenTexts} />
      </div>
    </div>
  );
};

export default FAQ;

const Accordion = ({ faqQuestions }) => {
  return (
    <div className="accordion">
      {faqQuestions.map((question, i) => (
        <AccordionItem
          key={question.label}
          question={question.question}
          answer={question.answer}
          key={i}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({ question, answer }) => {
  const [visibility, setVisibility] = useState(false);
  const handleToggleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <button
        className="accordion__button font-inter content-line text-base sm:text-lg md:text-xl text-border noSelect text-left"
        onClick={() => {
          handleToggleVisibility();
        }}
      >
        {question}
        <span>{visibility ? <AiOutlineCaretUp /> : <AiFillCaretDown />}</span>
      </button>
      <p
        className={`accordion__content ${
          visibility ? "active" : ""
        } content-line font-inter text-base sm:text-lg md:text-xl  text-border`}
      >
        {answer}
      </p>
    </div>
  );
};
