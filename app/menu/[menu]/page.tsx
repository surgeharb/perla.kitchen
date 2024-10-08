import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Info, ChevronRight } from 'lucide-react';
import { client as sanityClient } from '@/sanity/lib/client';
import { QueryMenuItemsResult } from '@/sanity.types';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { QueryMenuItems } from '@/sanity/queries/menu';

const builder = imageUrlBuilder(sanityClient);

const buildImage = (image: SanityImageSource) => builder.image(image).height(300).width(300);

async function getMenuItems(menu: string): Promise<QueryMenuItemsResult> {
  return sanityClient.fetch(QueryMenuItems, { menu });
}

export default async function MenuSinglePage({ params }: { params: { menu: string } }) {
  const menuItems = await getMenuItems(params.menu);
  const menu = menuItems[0].menu;

  return (
    <div className="min-h-screen bg-purple-10">
      <header className="bg-purple-500 text-white py-4">
        <div className="pl-3 pr-5 flex justify-between items-center">
          <Link href="/menu" className="flex items-center text-white hover:text-purple-200">
            <ChevronLeft />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-bold">{menu?.title}</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {menuItems.map((item) => (
            <Link
              key={item._id}
              href={`/menu/${params.menu}/${item.slug?.current}`}
              className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {!!item.image && (
                <div className="relative aspect-square w-full">
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
              <div className="p-3 flex-1 flex justify-between items-center">
                <h2 className="text-md font-semibold text-purple-800">{item.title}</h2>
                <ChevronRight className="text-purple-600" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
