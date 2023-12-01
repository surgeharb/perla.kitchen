import Image from 'next/image';
import { CategorySwiper } from '@/components/category-swiper';
import { CategoryArtwork } from '@/components/category-artwork';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <section className="w-full relative h-52">
        <Image
          className="object-cover"
          src="/images/channel-banner.jpeg"
          alt="Channel Banner"
          fill
        />
      </section>
      <section className="w-full">
        <CategorySwiper />
      </section>
      <section className="flex flex-wrap gap-12 px-6 lg:px-12 py-10">
        <div className="flex flex-col gap-4 flex-1 min-w-[330px]">
          <div className="relative w-full h-96">
            <Image
              className="object-cover rounded-md"
              src="/images/channel-banner.jpeg"
              alt="Channel Banner"
              fill
            />
          </div>
          <div className="flex w-[70%]">
            <p>
              Hi there! I am Perla and I am a food blogger. I love to cook and I love to share my
              recipes with you. I hope you enjoy them as much as I do!
            </p>
            <div className="w-[30%]"></div>
          </div>
          <div>
            <Button>Read More</Button>
          </div>
        </div>
        <div className="max-w-sm flex flex-col gap-4">
          <h5 className="text-2xl font-bold">Latest Recipes</h5>
          <div className="flex gap-4">
            <div>
              <CategoryArtwork
                category={{ name: 'Apetizers', cover: '/images/apetizers.jpeg' }}
                aspectRatio="square"
                className="w-[100%]"
                height={120}
                width={120}
                hideText
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-2">Stuffed tomato slices with cream cheese and herbs</h6>
              <div className="text-sm">May 23, 2023</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <CategoryArtwork
                category={{ name: 'Apetizers', cover: '/images/apetizers.jpeg' }}
                aspectRatio="square"
                className="w-[100%]"
                height={120}
                width={120}
                hideText
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-2">Stuffed tomato slices with cream cheese and herbs</h6>
              <div className="text-sm">May 23, 2023</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <CategoryArtwork
                category={{ name: 'Apetizers', cover: '/images/apetizers.jpeg' }}
                aspectRatio="square"
                className="w-[100%]"
                height={120}
                width={120}
                hideText
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-2">Stuffed tomato slices with cream cheese and herbs</h6>
              <div className="text-sm">May 23, 2023</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <CategoryArtwork
                category={{ name: 'Apetizers', cover: '/images/apetizers.jpeg' }}
                aspectRatio="square"
                className="w-[100%]"
                height={120}
                width={120}
                hideText
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-2">Stuffed tomato slices with cream cheese and herbs</h6>
              <div className="text-sm">May 23, 2023</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <CategoryArtwork
                category={{ name: 'Apetizers', cover: '/images/apetizers.jpeg' }}
                aspectRatio="square"
                className="w-[100%]"
                height={120}
                width={120}
                hideText
              />
            </div>
            <div className="flex flex-col justify-center">
              <h6 className="mb-2">Stuffed tomato slices with cream cheese and herbs</h6>
              <div className="text-sm">May 23, 2023</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
