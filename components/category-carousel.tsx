'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { CategoryArtwork } from './category-artwork';

export const CategoryCarousel = () => {
  return (
    <div className="flex justify-center items-center">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-[90%]"
      >
        <CarouselContent>
          {Array.from({ length: 20 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/6">
              <div className="p-1">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
