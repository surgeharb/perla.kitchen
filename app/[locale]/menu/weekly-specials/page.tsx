import React from 'react';
import { getTranslations } from 'next-intl/server';
import { QueryWeeklyMeals } from '@/sanity/queries/menu';
import { QueryWeeklyMealsResult } from '@/sanity.types';
import { areDatesEqual, getNextAvailableDates } from '@/lib/date';
import { sanityFetch } from '@/sanity/lib/client';
import { Locale } from '@/i18n/routing';
import { MenuLayout } from '@/components/layout/MenuLayout';
import { NavigationMenuHeader } from '@/components/layout/NavigationMenuHeader';
import { WeeklyMealCard } from './weekly-meal-card';

async function getWeeklyMeals(language: Locale): Promise<QueryWeeklyMealsResult | null> {
  const weeklyMeals = await sanityFetch({
    query: QueryWeeklyMeals,
    params: {
      language,
    },
  });
  return weeklyMeals;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

type WeeklySpecialsPageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function WeeklySpecialsPage({ params }: WeeklySpecialsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WeeklySpecials' });
  const weeklyMeals = await getWeeklyMeals(locale);

  if (!weeklyMeals) {
    return <div>{t('noWeeklyMealsFound')}</div>;
  }

  const nextTwoDates = getNextAvailableDates(
    weeklyMeals.map((meal) => new Date(meal.availableDate ?? '')),
    2,
  );

  return (
    <div className="min-h-screen bg-purple-10">
      <NavigationMenuHeader title={t('title')} />
      <MenuLayout>
        {nextTwoDates.map((date, dateIndex) => (
          <div key={date.toISOString()} className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-purple-600 capitalize">{formatDate(date)}</h2>
            {weeklyMeals
              .filter((meal) => areDatesEqual(meal.availableDate || '', date))
              .map((meal) => (
                <WeeklyMealCard key={meal._id} meal={meal} isReversed={dateIndex % 2 === 0} />
              ))}
          </div>
        ))}
        <p className="text-center text-gray-600">{t('orderInAdvance')}</p>
      </MenuLayout>
    </div>
  );
}
