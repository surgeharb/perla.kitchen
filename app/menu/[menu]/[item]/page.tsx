import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ChevronLeft, Utensils } from 'lucide-react';
import { buildSanityImageUrl, sanityFetch } from '@/sanity/lib/client';
import { QueryMenuItem } from '@/sanity/queries/menu';
import { QueryMenuItemResult } from '@/sanity.types';

const LANGUAGE = 'en';

async function getMenuItemDetails(slug: string): Promise<QueryMenuItemResult | null> {
  return sanityFetch({
    query: QueryMenuItem,
    params: { slug, language: LANGUAGE },
  });
}

export default async function ItemDetailsPage(
  props: {
    params: Promise<{ menu: string; item: string }>;
  }
) {
  const params = await props.params;
  const itemDetails = await getMenuItemDetails(params.item);

  if (!itemDetails || !itemDetails.image) {
    redirect('/404');
  }

  const image = buildSanityImageUrl(itemDetails.image, { height: 500, width: 500 });

  const imageUrl = image.url();
  const blurDataUrl = image.blur(1).url();
  const isAvailableForSale = true;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: itemDetails.title,
    description: itemDetails.description,
    image: imageUrl,
    offers: {
      '@type': 'Offer',
      availability: isAvailableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'EUR',
      price: itemDetails.price,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
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
                  src={imageUrl}
                  alt={itemDetails.title ?? 'Menu Item'}
                  blurDataURL={blurDataUrl}
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
                {itemDetails.servingSize && (
                  <div className="flex items-center gap-2">
                    <Utensils className="text-purple-600" />
                    <span>{itemDetails.servingSize}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
