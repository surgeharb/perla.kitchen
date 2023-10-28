import Image from 'next/image';
import { CategorySwiper } from '@/components/category-swiper';

export default function Home() {
  return (
    <main className="flex flex-col gap-16">
      <section className="w-full px-8">
        <div className="relative h-48 rounded-md overflow-hidden">
          <Image
            className="object-cover"
            src="/images/channel-banner.jpeg"
            alt="Channel Banner"
            fill
          />
        </div>
      </section>
      <section className="w-full">
        <CategorySwiper />
      </section>
    </main>
  );
}
