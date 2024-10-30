import React from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import { QueryMenus, QueryWeeklyMeals } from '@/sanity/queries/menu';
import { QueryMenusResult, QueryWeeklyMealsResult } from '@/sanity.types';
import { areDatesEqual, getDayName, getNextAvailableDates, unformatDate } from '@/lib/date';
import { MenuHeader } from '@/components/menu-header';
import { MenuCard } from '@/components/menu-card';

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
    <>
      <MenuHeader title="Our Menu" skipBack size="large" />
      <main className="container mx-auto p-4 flex flex-col gap-4">
        {currentDateMeals.length > 0 && (
          <MenuCard
            key="weekly-specials"
            title={`${getDayName(nextWeeklyMealDay)}'s Menu`}
            href={`/menu/weekly-specials`}
            variant="banner"
          />
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {menus.map((menu) => (
            <MenuCard
              key={menu._id}
              title={menu.title}
              image={menu.image}
              href={`/menu/${menu.slug?.current}`}
            />
          ))}
        </div>
      </main>
    </>
  );
}
