/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FantomIcon from "../public/images/misc/illustration-404.png";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { GoKey } from "react-icons/go";
import { GiCampfire } from "react-icons/gi";
const LatestSold = ({ lastSold }) => {
  const getMarketplaceIcon = (marketplace) => {
    let icon;
    switch (marketplace) {
      case "nftkey":
        icon = <GoKey />;
        break;
      case "campfire":
        icon = <GiCampfire />;
      default:
        throw "No Marketplace Icon Found";
    }
    return icon;
  };
  return (
    <div className="latestSoldFooter mx-2">
      {/* <div className="flex justify-around"> */}
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className=""
      >
        {lastSold?.map((nft) => {
          return (
            <SwiperSlide className="flex-col">
              <img
                src={nft.data?.image}
                className="latest-sold-img rounded-full m-auto"
              />
              <div className="flex justify-center items-center">
                <p className="mr-1">{getMarketplaceIcon(nft?.marketplace)}</p>
                <p className="font-inter text-base">{nft?.purchasedPrice}</p>
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 560 400"
                  xmlns="http://www.w3.org/2000/svg"
                  className="f-icon"
                >
                  <circle
                    cx="280"
                    cy="200"
                    fill="#13b5ec"
                    r="150"
                    stroke-width="9.375"
                  />
                  <path
                    d="m17.2 12.9 3.6-2.1v4.2zm3.6 9-4.8 2.8-4.8-2.8v-4.9l4.8 2.8 4.8-2.8zm-9.6-11.1 3.6 2.1-3.6 2.1zm5.4 3.1 3.6 2.1-3.6 2.1zm-1.2 4.2-3.6-2.1 3.6-2.1zm4.8-8.3-4.2 2.4-4.2-2.4 4.2-2.5zm-10.2-.4v13.1l6 3.4 6-3.4v-13.1l-6-3.4z"
                    fill="#fff"
                    transform="matrix(9.375 0 0 9.375 130 50)"
                  />
                </svg>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
    // </div>
  );
};

export default LatestSold;
