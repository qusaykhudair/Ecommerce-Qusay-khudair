'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { CategoryType } from '@/types/products.type';

export default function CategoryCarousel({
  getAllCategoriesData,
}: {
  getAllCategoriesData: CategoryType[];
}) {
  return (
    <div className="w-full py-6">
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        breakpoints={{
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {getAllCategoriesData.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="group cursor-pointer">
        
              <div className="relative w-full h-56 md:h-72 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                />
              </div>

         
              <p className="mt-2 text-center text-sm md:text-base font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                {category.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
