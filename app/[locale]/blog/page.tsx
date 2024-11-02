import Image from 'next/image';

export default function Blog() {
  return (
    <main className="flex flex-col gap-8 px-6 lg:px-12">
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
    </main>
  );
}
