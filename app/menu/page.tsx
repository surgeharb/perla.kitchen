import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { buildSanityImageUrl, sanityFetch } from '@/sanity/lib/client';
import { QueryMenus, QueryWeeklyMeals } from '@/sanity/queries/menu';
import { QueryMenusResult, QueryWeeklyMealsResult } from '@/sanity.types';
import { areDatesEqual, getDayName, getNextAvailableDates, unformatDate } from '@/lib/date';

const LANGUAGE = 'en';

const getWeeklyMeals = async (): Promise<QueryWeeklyMealsResult | null> => {
  const weeklyMeals = await sanityFetch({
    query: QueryWeeklyMeals,
    params: {
      language: LANGUAGE,
    },
  });
  return weeklyMeals;
};

async function getMenus(): Promise<QueryMenusResult> {
  return sanityFetch({
    query: QueryMenus,
  });
}

export default async function MenuListPage() {
  const [menus, weeklyMeals] = await Promise.all([getMenus(), getWeeklyMeals()]);

  const [nextWeeklyMealDay] = getNextAvailableDates(
    (weeklyMeals || []).map((meal) => unformatDate(meal.availableDate ?? '')),
    1,
  );

  const currentDateMeals = (weeklyMeals || []).filter((meal) =>
    areDatesEqual(meal.availableDate || '', nextWeeklyMealDay),
  );

  return (
    <main className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Menu</h2>
      {currentDateMeals.length > 0 && (
        <Link href="/menu/weekly-specials" className="block mb-6">
          <div className="bg-purple-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0 flex">
              <div className="w-full h-32 relative">
                <Image
                  src="/images/channel-banner.jpeg"
                  alt="Weekly Menu"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-grow p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-800">
                  {getDayName(nextWeeklyMealDay)}&apos;s Menu
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
                  src={buildSanityImageUrl(menu.image ?? '', {
                    height: 500,
                    width: 500,
                  }).url()}
                  alt={menu.title ?? 'Menu'}
                  className="object-cover"
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
