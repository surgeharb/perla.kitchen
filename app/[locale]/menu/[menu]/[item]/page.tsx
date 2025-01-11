import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Utensils, Sparkles } from 'lucide-react';
import { buildSanityImageUrl, sanityFetch } from '@/sanity/lib/client';
import {
  QueryMenuItem,
  QueryMenuItems,
  QueryWeeklyMeals,
  QueryWeeklyMealWithItem,
} from '@/sanity/queries/menu';
import {
  QueryMenuItemResult,
  QueryMenuItemsResult,
  QueryWeeklyMealsResult,
  QueryWeeklyMealWithItemResult,
} from '@/sanity.types';
import { NavigationMenuHeader } from '@/components/layout/NavigationMenuHeader';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n/routing';
import { OrderItemForm } from '@/components/forms/OrderItemForm';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

async function getMenuItemDetails(
  slug: string,
  language: Locale,
): Promise<QueryMenuItemResult | null> {
  return sanityFetch({
    query: QueryMenuItem,
    params: { slug, language },
  });
}

async function getMenuItems(menu: string, language: Locale): Promise<QueryMenuItemsResult> {
  return sanityFetch({
    query: QueryMenuItems,
    params: { menu, language },
  });
}

async function getWeeklyMealWithItem(
  itemId: string,
  language: Locale,
): Promise<QueryWeeklyMealWithItemResult> {
  return sanityFetch({
    query: QueryWeeklyMealWithItem,
    params: { itemId, language },
  });
}

async function getWeeklyMeals(language: Locale): Promise<QueryWeeklyMealsResult> {
  const weeklyMeals = await sanityFetch({
    query: QueryWeeklyMeals,
    params: {
      language,
    },
  });
  return weeklyMeals;
}

export async function generateStaticParams(props: {
  params: Promise<{ menu: string; locale: Locale }>;
}) {
  const { menu, locale } = await props.params;
  const menuItems = await getMenuItems(menu, locale);
  const weeklyMeals = await getWeeklyMeals(locale);

  return [
    ...menuItems.map((item) => ({ menu, item: item.slug?.current })),
    ...weeklyMeals.map((meal) => ({
      menu: 'weekly-specials',
      item: meal.menuItems?.[0]?.slug?.current,
    })),
  ];
}

export default async function ItemDetailsPage(props: {
  params: Promise<{ menu: string; item: string; locale: Locale }>;
}) {
  const { menu, item, locale } = await props.params;
  const itemDetails = await getMenuItemDetails(item, locale);

  if (!itemDetails || !itemDetails.image) {
    redirect('/404');
  }

  if (menu === 'weekly-specials') {
    const weeklyMealWithItem = await getWeeklyMealWithItem(itemDetails._id, locale);
    if (weeklyMealWithItem) {
      itemDetails.description = weeklyMealWithItem.description;
      itemDetails.servingSizes = [
        {
          size: 'Weekly Special',
          price: weeklyMealWithItem.price,
          originalPrice: null,
        },
      ];
    }
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

  const defaultServingSize =
    itemDetails.servingSizes?.find((serving) => serving.originalPrice)?.size ??
    itemDetails.servingSizes?.[0]?.size ??
    '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <NavigationMenuHeader title={itemDetails.menu?.title ?? 'Menu'} />
      <section className="container mx-auto p-4">
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
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-purple-800">{itemDetails.title}</h2>
              {!!itemDetails.description && (
                <p className="text-gray-600">{itemDetails.description}</p>
              )}
            </div>
            {!!itemDetails?.servingSizes?.length && (
              <OrderItemForm itemTitle={itemDetails.title ?? ''} className="flex flex-col gap-4">
                <RadioGroup
                  name="serving-size"
                  className="flex flex-col gap-4"
                  defaultValue={defaultServingSize}>
                  {itemDetails.servingSizes.map((serving) => (
                    <Label
                      key={serving.size}
                      htmlFor={serving.size ?? ''}
                      className="relative flex items-center justify-between p-3 rounded-lg border-2 border-purple-100 has-[input:checked]:border-purple-600 has-[input:checked]:bg-purple-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={serving.size ?? ''} id={serving.size ?? ''} />
                        <div className="flex items-center gap-2">
                          <Utensils className="text-purple-600 h-5 w-5" />
                          <span className="font-medium">{serving.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!!serving.originalPrice && !!serving.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {serving.originalPrice} €
                          </span>
                        )}
                        <span className="text-lg font-semibold text-purple-600">
                          {serving.price} €
                        </span>
                      </div>
                      {!!serving.originalPrice && !!serving.price && (
                        <div className="absolute top-[-12px] right-[-8px]">
                          <span className="rounded-sm bg-purple-600/95 px-2 py-0.5 text-xs text-white flex items-center gap-1">
                            <Sparkles className="h-3 w-3 inline" />
                            Save{' '}
                            {Math.round(
                              ((serving.originalPrice - serving.price) / serving.originalPrice) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                      )}
                    </Label>
                  ))}
                </RadioGroup>
                <Button type="submit" variant="default" size="lg" className="w-full">
                  Order Now
                </Button>
              </OrderItemForm>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
