/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { GoKey } from "react-icons/go";
import { GiCampfire } from "react-icons/gi";
import FantomIcon from "./svg-icons/FantomIcon";

const LatestSold = ({ lastSold }) => {
  const getMarketplaceIcon = (marketplace) => {
    console.log(marketplace);
    let icon;
    switch (marketplace) {
      case "nftkey":
        icon = <GoKey />;
        break;
      case "campfire":
        icon = <GiCampfire />;
      default:
        console.log(marketplace);
    }
    return icon;
  };

  return (
    <div className="latestSoldFooter mx-2 hidden md:block">
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        centeredSlides={false}
        grabCursor={true}
        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination]}
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
                <FantomIcon />
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
