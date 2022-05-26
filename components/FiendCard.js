import { useState } from "react";
import Emoji from "./Emoji";
import Image from "next/image";

const FiendCard = ({ title, image, alt, perks, background }) => {
  return (
    <div
      className={`${background} fiendz-card-container w-50 md:w-5/6 lg:m-3 w-5/6 relative justify-center mb-10 flex items-start pt-10 lg:w-10/12`}
      key={title}
    >
      <div className="w-48 absolute -top-6">
        <Image src={title} alt={title} />
      </div>
      <div className="mx-4 border-3 flex flex-col justify-center">
        <Image src={image} alt={alt} />
        <ul className="my-6">
          {perks.map((perk, i) => {
            return (
              <li
                className="m-2 text-base font-inter content-line font-normal"
                key={i}
              >
                <span className="mr-2 text-xl">
                  <Emoji symbol={perk.emoji} label={perk.label} />
                </span>{" "}
                {perk.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FiendCard;
