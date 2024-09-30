'use client';

import React from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const weeklyMeals = {
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
  ],
};

export default function WeeklySpecialsPage() {
  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-purple-500 text-white py-4">
        <div className="pl-3 pr-5 flex justify-between items-center">
          <Link href={`/menu`} className="flex items-center text-white hover:text-purple-200">
            <ChevronLeft />
            <span>Back to Menu</span>
          </Link>
          <h1 className="text-2xl font-bold">Weekly Specials</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Weekly Special Meals</CardTitle>
            <CardDescription>
              Enjoy our chef&apos;s selection every Tuesday and Thursday
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tuesday">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                <TabsTrigger value="thursday">Thursday</TabsTrigger>
              </TabsList>
              <TabsContent value="tuesday">
                <div className="grid gap-4 md:grid-cols-2">
                  {weeklyMeals.tuesday.map((meal, index) => (
                    <Card key={index}>
                      <CardContent className="p-0">
                        <Image
                          src={meal.image}
                          alt={meal.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2">{meal.name}</h3>
                          <p className="text-sm text-gray-600">{meal.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="thursday">
                <div className="grid gap-4 md:grid-cols-2">
                  {weeklyMeals.thursday.map((meal, index) => (
                    <Card key={index}>
                      <CardContent className="p-0">
                        <Image
                          src={meal.image}
                          alt={meal.name}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-2">{meal.name}</h3>
                          <p className="text-sm text-gray-600">{meal.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
