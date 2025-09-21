"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProdctsType } from "@/types/products.type";
import Product from "../Product/Product";



export default function ProductSwiper({relatedProducts}:{relatedProducts:ProdctsType[]}) {
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Related Products
      </h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 25 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="pb-10"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white rounded-xl my-5 mx-3 shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <Product product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
