import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Info } from 'lucide-react';
import { client as sanityClient } from '@/sanity/lib/client';
import { MenuItem } from '@/sanity.types';
import { groq } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityClient);

const buildImage = (image: SanityImageSource) => builder.image(image).height(300).width(300);

async function getMenuItems(menu: string): Promise<MenuItem[]> {
  return sanityClient.fetch(
    groq`*[_type == "menuItem" && menu->slug.current == $menu] {
      _id,
      title,
      description,
      slug,
      price,
      image,
      menu
    }`,
    { menu }
  );
}

export default async function MenuSinglePage({ params }: { params: { menu: string } }) {
  const menuItems = await getMenuItems(params.menu);
  return (
    <div className="min-h-screen bg-purple-10">
      <header className="bg-purple-500 text-white py-4">
        <div className="pl-3 pr-5 flex justify-between items-center">
          <Link href="/menu" className="flex items-center text-white hover:text-purple-200">
            <ChevronLeft />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl font-bold">{params.menu}</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {menuItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {!!item.image && (
                <div className="relative aspect-square w-full max-w-md mx-auto">
                  <Image
                    src={buildImage(item.image).url()}
                    alt={item.title ?? 'Menu Item'}
                    blurDataURL={buildImage(item.image).blur(1).url()}
                    className="object-cover"
                    placeholder="blur"
                    fill
                  />
                </div>
              )}
              <div className="p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-semibold text-purple-800 mb-1 sm:mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 font-medium">{item.price || 0}€</p>
                <Link
                  href={`/menu/${params.menu}/${item.slug?.current}`}
                  className="mt-2 sm:mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 text-sm sm:text-base"
                >
                  <Info className="mr-1 sm:mr-2" size={16} />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
