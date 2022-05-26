import Image from "next/image";
import { FaTwitter, FaInstagram } from "react-icons/fa";

const TeamCard = ({ name, image, position, links }) => {
  return (
    <div className="team-card mx-6 my-2">
      <Image src={image} alt="team member" />
      <div className="flex flex-col justify-center items-center mt-6">
        <h2 className="font-inter text-base lg:text-lg font-normal text-border">
          {name}
        </h2>
        <h4 className="font-inter text-base lg:text-lg font-normal text-border mt-1">
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
