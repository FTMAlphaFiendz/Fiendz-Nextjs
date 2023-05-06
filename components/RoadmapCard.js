import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useEffect } from "react";
const RoadmapCard = ({ title, phaseComplete, phaseItems }) => {
  return (
    <>
      <div
        className={`${
          phaseComplete ? "bg-green" : "bg-red"
        } absolute phase-titles block flex place-items-center px-8 -top-6 justify-center`}
      >
        <h1 className="phase-text font-bakbak text-center text-xl">{title}</h1>
      </div>
      <div className="mx-4 border-3">
        <ul className="mt-12 mb-6">
          {phaseItems.map((item, i) => {
            return (
              <li
                className="m-2 text-base sm:text-lg md:text-xl  content-line font-inter font-bold flex items-center"
                key={i}
              >
                <span className={`text-green inline-block mb-2`}>
                  {item.completed ? (
                    <ImCheckboxChecked style={{ color: "#44de62" }} />
                  ) : (
                    <ImCheckboxUnchecked />
                  )}
                </span>
                <span className="inline-block ml-4 mb-2 text-border md:text-md lg:text-lg">
                  {item.content}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default RoadmapCard;
