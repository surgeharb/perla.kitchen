import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { buildSanityImageUrl, sanityFetch } from '@/sanity/lib/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { QueryMenus } from '@/sanity/queries/menu';
import { QueryMenusResult } from '@/sanity.types';

const getMenuImage = (image: SanityImageSource) =>
  buildSanityImageUrl(image, { height: 300, width: 300 });

async function getMenus(): Promise<QueryMenusResult> {
  return sanityFetch({
    query: QueryMenus,
  });
}

const weeklySpecials = {
  tuesday: [
    {
      name: 'Grilled Salmon',
      description: 'With lemon butter sauce and asparagus',
      image: '/images/apetizers.jpeg',
    },
    {
      name: 'Vegetarian Lasagna',
      description: 'Layers of pasta, vegetables, and cheese',
      image: '/images/apetizers.jpeg',
    },
  ],
  thursday: [
    {
      name: 'Chicken Stir-Fry',
      description: 'With mixed vegetables and teriyaki sauce',
      image: '/images/apetizers.jpeg',
    },
    {
      name: 'Chicken Stir-Fry',
      description: 'With mixed vegetables and teriyaki sauce',
      image: '/images/apetizers.jpeg',
    },
  ],
};

export default async function MenuListPage() {
  const menus = await getMenus();

  const nextSpecialBaseOnDate = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek >= 2 && dayOfWeek < 4) {
      return 'thursday';
    }

    return 'tuesday';
  };

  const currentSpecialDay = nextSpecialBaseOnDate();
  const currentSpecial = weeklySpecials[currentSpecialDay];

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Menu</h2>
      {currentSpecial && (
        <Link href="/menu/weekly-specials" className="block mb-6">
          <div className="bg-purple-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0 flex">
              {currentSpecial.map((meal, index) => (
                <div key={index} className="w-1/2 h-32 relative">
                  <Image src={meal.image} alt={meal.name} layout="fill" objectFit="cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <div className="flex-grow p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-800">
                  {currentSpecialDay}&apos;s Weekly Specials
                </h3>
                <ChevronRight className="text-purple-600" />
              </div>
            </div>
          </div>
        </Link>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {menus.map((menu, index) => (
          <Link
            key={index}
            href={`/menu/${menu.slug?.current}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            {menu.image && (
              <div className="relative aspect-square w-full">
                <Image
                  src={getMenuImage(menu.image).url()}
                  alt={menu.title ?? 'Menu'}
                  blurDataURL={getMenuImage(menu.image).blur(1).url()}
                  className="object-cover"
                  placeholder="blur"
                  fill
                />
              </div>
            )}
            <div className="p-4 flex justify-between items-center bg-purple-200 flex-1">
              <h3 className="text-lg font-semibold text-purple-800">{menu.title}</h3>
              <ChevronRight className="text-purple-600" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
