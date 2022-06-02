import Image from "next/image";
import { FaTwitter, FaInstagram } from "react-icons/fa";

const TeamCard = ({ name, image, position, links }) => {
  return (
    <div className="mx-6 my-2 text-center">
      <Image src={image} alt="team member" />
      <div className="flex flex-col justify-center items-center mt-6">
        <h2 className="font-inter text-base sm:text-lg md:text-xl font-normal text-border">
          {name}
        </h2>
        <h4 className="font-inter text-base sm:text-lg md:text-xl  font-normal text-border mt-1 w-10/12 text-center">
          {position}
        </h4>
        <div className="text-3xl mt-3 text-border flex">
          {links.map((link, i) => {
            return link.type === "twitter" ? (
              <button
                key={i + link.type}
                className="twitter"
                onClick={() => {
                  window.open(link.url);
                }}
              >
                <FaTwitter />
              </button>
            ) : (
              <button
                key={i + link.type}
                className="ml-3 instagram"
                onClick={() => {
                  window.open(link.url);
                }}
              >
                <FaInstagram />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
