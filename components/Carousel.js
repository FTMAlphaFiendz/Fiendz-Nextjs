import TeamCard from "./TeamCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hidden: { opacity: 0, y: 100 },
};

const Carousel = ({ data }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      className="relative w-full flex flex-col justify-center items-center my-6"
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      <>
        <div className="w-full md:w-[70%] text-white flex justify-center items-center">
          <Swiper
            modules={[Navigation]}
            centeredSlides={true}
            loop={true}
            navigation={true}
            className="w-full "
          >
            {data.map((item, i) => {
              return (
                <SwiperSlide key={i} className="flex justify-center">
                  <TeamCard
                    name={item.handle}
                    image={item.image}
                    position={item.position}
                    links={item.links}
                    key={item.handle}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </>
    </motion.div>
  );
};

export default Carousel;
