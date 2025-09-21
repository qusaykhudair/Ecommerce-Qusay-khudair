"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import image1 from "../../../../public/images/slider-image-1.jpeg";
import image2 from "../../../../public/images/slider-image-2.jpeg";
import image3 from "../../../../public/images/slider-image-3.jpeg";

export default function HomeSlider() {
  return (
    <div className="grid grid-cols-12 gap-4">
     
      <div className="col-span-8">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <Image
              src={image1}
              alt="image1"
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={image2}
              alt="image2"
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={image3}
              alt="image3"
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </div>

   
      <div className="col-span-4 flex flex-col gap-3">
        <Image
          src={image2}
          alt="image2"
          className="w-full h-[245px] object-cover rounded-lg"
        />
        <Image
          src={image3}
          alt="image3"
          className="w-full h-[245px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
