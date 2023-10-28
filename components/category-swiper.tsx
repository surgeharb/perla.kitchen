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
      slidesPerView={2}
      modules={[Navigation]}
      breakpoints={{
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 6,
        },
        1920: {
          slidesPerView: 7,
        },
        3840: {
          slidesPerView: 8,
        },
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <SwiperSlide key={i} className="px-4 first:ps-8">
          <CategoryArtwork
            category={{
              name: 'Rock',
              cover: '/images/channel-banner.jpeg',
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
