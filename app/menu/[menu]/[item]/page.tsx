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

export default async function ItemDetailsPage(props: {
  params: Promise<{ menu: string; item: string }>;
}) {
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
      price: itemDetails.servingSizes?.[0]?.price ?? 0,
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
            <div className="p-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-purple-800">{itemDetails.title}</h2>
              {!!itemDetails?.servingSizes?.length && (
                <div className="flex flex-col gap-3">
                  {itemDetails.servingSizes.map((serving, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-purple-100 hover:border-purple-300 transition-colors">
                      <div className="flex items-center gap-2">
                        <Utensils className="text-purple-600 h-5 w-5" />
                        <span className="font-medium">{serving.size}</span>
                      </div>
                      <span className="text-lg font-semibold text-purple-600">
                        {serving.price} €
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {!!itemDetails.description && (
                <p className="text-gray-600">{itemDetails.description}</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
