import React from 'react';
import { QueryWeeklyMeals } from '@/sanity/queries/menu';
import { QueryWeeklyMealsResult } from '@/sanity.types';
import { areDatesEqual, getNextAvailableDates } from '@/lib/date';
import { sanityFetch } from '@/sanity/lib/client';
import { WeeklyMealCard } from './weekly-meal-card';

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

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

export default async function WeeklySpecialsPage() {
  const weeklyMeals = await getWeeklyMeals();

  if (!weeklyMeals) {
    return <div>No weekly meals found</div>;
  }

  const nextTwoDates = getNextAvailableDates(
    weeklyMeals.map((meal) => new Date(meal.availableDate ?? '')),
    2,
  );

  return (
    <section className="container mx-auto px-4 py-6 flex flex-col gap-4">
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
      <p className="text-center text-gray-600">Please order at least one day in advance</p>
    </section>
  );
}
