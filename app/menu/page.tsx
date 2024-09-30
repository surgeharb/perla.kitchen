import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

const categories = [
  {
    name: 'Desserts',
    image: '/images/apetizers.jpeg',
    href: '/menu/desserts',
  },
  {
    name: 'Salty',
    image: '/images/apetizers.jpeg',
    href: '/menu/salty',
  },
  {
    name: 'Daily Meals',
    image: '/images/apetizers.jpeg',
    href: '/menu/daily-meals',
  },
  {
    name: 'Appetizers',
    image: '/images/apetizers.jpeg',
    href: '/menu/appetizers',
  },
  {
    name: 'Drinks',
    image: '/images/apetizers.jpeg',
    href: '/menu/drinks',
  },
  {
    name: 'Specials',
    image: '/images/apetizers.jpeg',
    href: '/menu/specials',
  },
];

const nextSpecialBaseOnDate = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  if (dayOfWeek >= 2 && dayOfWeek < 4) {
    return 'thursday';
  }

  return 'tuesday';
};

export default function MenuPage() {
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Menu</h2>
      {nextSpecialBaseOnDate() && (
        <Link href="/menu/weekly-specials" className="block mb-6">
          <div className="bg-purple-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0 flex">
              {weeklySpecials[nextSpecialBaseOnDate()].map((meal, index) => (
                <div key={index} className="w-1/2 h-32 relative">
                  <Image src={meal.image} alt={meal.name} layout="fill" objectFit="cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <div className="flex-grow p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-purple-800">
                  {nextSpecialBaseOnDate() === 'tuesday'
                    ? "Tuesday's Weekly Specials"
                    : "Thursday's Weekly Specials"}
                </h3>
                <ChevronRight className="text-purple-600" />
              </div>
            </div>
          </div>
        </Link>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className={`aspect-w-16 aspect-h-9`}>
              <Image
                src={category.image}
                alt={category.name}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 flex justify-between items-center bg-purple-200">
              <h3 className="text-lg font-semibold text-purple-800">{category.name}</h3>
              <ChevronRight className="text-purple-600" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
