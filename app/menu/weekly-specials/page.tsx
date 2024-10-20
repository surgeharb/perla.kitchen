import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-purple-50">
      <header className="bg-purple-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/menu" className="flex items-center text-white hover:text-purple-200">
            <ChevronLeft className="mr-2" />
            <span>Back to Menu</span>
          </Link>
          <h1 className="text-2xl font-bold">Weekly Menu</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 flex flex-col gap-4">
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
      </main>
    </div>
  );
}
