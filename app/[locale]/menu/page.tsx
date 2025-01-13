import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/sanity/lib/client';
import { QueryMenus, QueryWeeklyMeals } from '@/sanity/queries/menu';
import { QueryMenusResult, QueryWeeklyMealsResult } from '@/sanity.types';
import { areDatesEqual, getDayName, getNextAvailableDates, unformatDate } from '@/lib/date';
import { MenuCard } from '@/components/menu-card';
import { Locale } from '@/i18n/routing';
import { MenuLayout } from '@/components/layout/MenuLayout';

const getWeeklyMeals = async (language: Locale): Promise<QueryWeeklyMealsResult | null> => {
  const weeklyMeals = await sanityFetch({
    query: QueryWeeklyMeals,
    params: {
      language,
    },
  });
  return weeklyMeals;
};

async function getMenus(language: Locale): Promise<QueryMenusResult> {
  return sanityFetch({
    query: QueryMenus,
    params: {
      language,
    },
  });
}

type MenuListPageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function MenuListPage({ params }: MenuListPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const [menus, weeklyMeals] = await Promise.all([getMenus(locale), getWeeklyMeals(locale)]);

  const [nextWeeklyMealDay] = getNextAvailableDates(
    (weeklyMeals || []).map((meal) => unformatDate(meal.availableDate ?? '')),
    1,
  );

  const currentDateMeals = nextWeeklyMealDay
    ? (weeklyMeals || []).filter((meal) =>
        areDatesEqual(meal.availableDate || '', nextWeeklyMealDay),
      )
    : [];

  return (
    <>
      <div className="bg-purple-100 p-3">
        <p className="text-md text-center">
          🎉{' '}
          <Link href="/subscription" className="text-purple-500 underline">
            Get 1 week of FREE meals -{'>'}
          </Link>
        </p>
      </div>
      <MenuLayout>
        <h2 className="text-2xl font-bold">{t('MainHeader.ourMenu')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {currentDateMeals.length > 0 && (
            <MenuCard
              key="weekly-specials"
              className="col-span-full md:col-span-2"
              title={`${getDayName(nextWeeklyMealDay)}'s Menu`}
              href={`/menu/weekly-specials`}
              variant="banner"
            />
          )}
          {menus.map((menu) => (
            <MenuCard
              key={menu._id}
              title={menu.title}
              image={menu.image}
              href={`/menu/${menu.slug?.current}`}
            />
          ))}
        </div>
      </MenuLayout>
    </>
  );
}
