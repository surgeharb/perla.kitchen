import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Clock, Utensils, AlertCircle } from 'lucide-react';

// This would typically come from a database or API
const itemDetails = {
  id: 1,
  name: 'Classic Fries',
  price: 2.99,
  image: '/images/apetizers.jpeg',
  description:
    'Golden, crispy fries made from premium potatoes. Perfectly salted and irresistibly delicious.',
  preparationTime: '10 minutes',
  calories: 365,
  allergens: ['Potatoes', 'Vegetable Oil'],
};

export default function ItemDetailsPage({
  params,
}: {
  params: { category: string; item: string };
}) {
  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-purple-500 text-white py-4">
        <div className="pl-3 pr-5 flex justify-between items-center">
          <Link
            href={`/menu/${params.category}`}
            className="flex items-center text-white hover:text-purple-200"
          >
            <ChevronLeft />
            <span>Back to {params.category}</span>
          </Link>
          <h1 className="text-2xl font-bold">{itemDetails.name}</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 sm:h-96">
            <Image
              src={itemDetails.image}
              alt={itemDetails.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-purple-800">{itemDetails.name}</h2>
              <p className="text-2xl font-semibold text-purple-600">
                ${itemDetails.price.toFixed(2)}
              </p>
            </div>
            <p className="text-gray-600 mb-6">{itemDetails.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="text-purple-600 mr-2" />
                <span>Preparation Time: {itemDetails.preparationTime}</span>
              </div>
              <div className="flex items-center">
                <Utensils className="text-purple-600 mr-2" />
                <span>Calories: {itemDetails.calories}</span>
              </div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-2 flex items-center">
                <AlertCircle className="text-purple-600 mr-2" />
                Allergen Information
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {itemDetails.allergens.map((allergen, index) => (
                  <li key={index}>{allergen}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
