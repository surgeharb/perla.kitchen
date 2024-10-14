import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { QueryWeeklyMeals } from '@/sanity/queries/menu';
import { client as sanityClient } from '@/sanity/lib/client';
import { QueryWeeklyMealsResult } from '@/sanity.types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';
import { cn } from '@/lib/utils';

const builder = imageUrlBuilder(sanityClient);

const buildImage = (image: SanityImageSource) => builder.image(image).height(100).width(100);

const getWeeklyMeals = async (): Promise<QueryWeeklyMealsResult | null> => {
  const weeklyMeals = await sanityClient.fetch(QueryWeeklyMeals);
  return weeklyMeals;
};

export default async function WeeklySpecialsPage() {
  const weeklyMeals = await getWeeklyMeals();

  if (!weeklyMeals) {
    return <div>No weekly meals found</div>;
  }

  const day1Index = 0;
  const day1 = 'Tuesday';
  const day2Index = 1;
  const day2 = 'Thursday';

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-purple-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/menu" className="flex items-center text-white hover:text-purple-200">
            <ChevronLeft className="mr-2" />
            <span>Back to Menu</span>
          </Link>
          <h1 className="text-2xl font-bold">Weekly Specials</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 flex flex-col gap-8">
        <div key={day1}>
          <h2 className="text-2xl font-bold text-purple-600 mb-4 capitalize">{day1}</h2>
          {weeklyMeals.map(
            (meal) =>
              meal.menuItems &&
              meal.menuItems.length > 0 && (
                <Card key={meal._id} className="mb-4 overflow-hidden">
                  <CardContent
                    className={cn(
                      'p-4 flex items-center',
                      cn(day1Index % 2 === 0 ? 'flex' : 'flex-row-reverse'),
                    )}>
                    <div className="flex-grow pr-4">
                      <h3 className="text-xl font-semibold mb-2">{meal.menuItems[0].title}</h3>
                      <p className="text-gray-600 mb-2">Nice touch with the lemon</p>
                      <p className="text-purple-600 font-bold text-lg">
                        € {meal.menuItems[0].price}
                      </p>
                    </div>
                    {meal.menuItems[0].image && (
                      <Image
                        src={buildImage(meal.menuItems[0].image).url()}
                        alt={meal.menuItems[0].title ?? 'Meal'}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                  </CardContent>
                </Card>
              ),
          )}
        </div>
        <div key={day2}>
          <h2 className="text-2xl font-bold text-purple-600 mb-4 capitalize">{day2}</h2>
          {weeklyMeals.map(
            (meal) =>
              meal.menuItems &&
              meal.menuItems.length > 0 && (
                <Card key={meal._id} className="mb-4 overflow-hidden">
                  <CardContent
                    className={cn(
                      'p-4 flex items-center',
                      cn(day2Index % 2 === 0 ? 'flex' : 'flex-row-reverse'),
                    )}>
                    <div className="flex-grow pr-4">
                      <h3 className="text-xl font-semibold mb-2">{meal.menuItems[0].title}</h3>
                      <p className="text-gray-600 mb-2">Nice touch with the lemon</p>
                      <p className="text-purple-600 font-bold text-lg">
                        € {meal.menuItems[0].price}
                      </p>
                    </div>
                    {meal.menuItems[0].image && (
                      <Image
                        src={buildImage(meal.menuItems[0].image).url()}
                        alt={meal.menuItems[0].title ?? 'Meal'}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                  </CardContent>
                </Card>
              ),
          )}
        </div>
        <p className="text-center text-gray-600 text-lg">
          Please order at least one day in advance
        </p>
      </main>
    </div>
  );
}
