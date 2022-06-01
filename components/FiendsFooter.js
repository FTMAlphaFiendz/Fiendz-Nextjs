import Image from "next/image";
import Fiend1 from "../public/images/fiendz/fiend-1.png";
import Fiend2 from "../public/images/fiendz/fiend-2.png";
import Fiend3 from "../public/images/fiendz/fiend-3.png";
import Fiend4 from "../public/images/fiendz/fiend-4.png";
import Fiend5 from "../public/images/fiendz/fiend-5.png";

const FiendsFooter = () => {
  const images = [Fiend1, Fiend2, Fiend3, Fiend4, Fiend5];
  const lastImageIdx = images.length - 1;
  return (
    <div className="flex space-between absolute bottom-0">
      {images.map((image, i) => {
        return (
          <div
            key={i}
            className={`${i === 1 && "hidden md:block"} ${
              i === lastImageIdx && "hidden md:block"
            }`}
          >
            <Image src={image} alt={image} />
          </div>
        );
      })}
    </div>
  );
};

export default FiendsFooter;
