'use client';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { CategoryArtwork } from './category-artwork';

export const CategorySwiper = () => {
  return (
    <Swiper
      loop
      navigation
      slidesPerView={3}
      spaceBetween={16}
      modules={[Navigation]}
      breakpoints={{
        640: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 5,
        },
        1024: {
          slidesPerView: 6,
        },
        1280: {
          slidesPerView: 7,
        },
        1920: {
          slidesPerView: 8,
        },
        3840: {
          slidesPerView: 9,
        },
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <SwiperSlide key={i}>
          <CategoryArtwork
            category={{
              name: 'Apetizers',
              cover: '/images/apetizers.jpeg',
            }}
            aspectRatio="square"
            className="w-[100%]"
            height={200}
            width={200}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
