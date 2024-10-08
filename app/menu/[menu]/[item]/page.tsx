import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ChevronLeft, Clock, Utensils } from 'lucide-react';
import { client as sanityClient } from '@/sanity/lib/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { QueryMenuItem } from '@/sanity/queries/menu';
import { QueryMenuItemResult } from '@/sanity.types';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

const buildImage = (image: SanityImageSource) => builder.image(image).height(500).width(500);

async function getMenuItemDetails(slug: string): Promise<QueryMenuItemResult | null> {
  return sanityClient.fetch(QueryMenuItem, { slug });
}

export default async function ItemDetailsPage({
  params,
}: {
  params: { menu: string; item: string };
}) {
  const itemDetails = await getMenuItemDetails(params.item);

  if (!itemDetails) {
    redirect('/404');
  }

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-purple-500 text-white py-4">
        <div className="pl-3 pr-5 flex justify-between items-center">
          <Link
            href={`/menu/${params.menu}`}
            className="flex items-center text-white hover:text-purple-200">
            <ChevronLeft />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-bold">{itemDetails.title}</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {!!itemDetails.image && (
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <Image
                src={buildImage(itemDetails.image).url()}
                alt={itemDetails.title ?? 'Menu Item'}
                blurDataURL={buildImage(itemDetails.image).blur(1).url()}
                placeholder="blur"
                className="object-cover"
                fill
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex justify-between items-center gap-4">
              <h2 className="text-2xl font-bold text-purple-800 flex-2">{itemDetails.title}</h2>
              <p className="text-xl font-semibold text-purple-600 flex-1 min-w-[75px] text-right">
                {itemDetails.price} €
              </p>
            </div>
            <p className="text-gray-600 mb-6">{itemDetails.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="text-purple-600 mr-2" />
                <span>Preparation Time: 1 day</span>
              </div>
              {itemDetails.servingSize && (
                <div className="flex items-center">
                  <Utensils className="text-purple-600 mr-2" />
                  <span>Calories: {itemDetails.servingSize}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
