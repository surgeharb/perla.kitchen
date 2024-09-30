import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Info } from 'lucide-react';

const saltyItems = [
  { id: 1, name: 'Classic Fries', price: 2.99, image: '/images/apetizers.jpeg' },
  { id: 2, name: 'Chicken Wings', price: 7.99, image: '/images/apetizers.jpeg' },
  { id: 3, name: 'Nachos Supreme', price: 6.99, image: '/images/apetizers.jpeg' },
  { id: 4, name: 'Mozzarella Sticks', price: 4.99, image: '/images/apetizers.jpeg' },
  { id: 5, name: 'Onion Rings', price: 3.99, image: '/images/apetizers.jpeg' },
  { id: 6, name: 'Potato Wedges', price: 3.49, image: '/images/apetizers.jpeg' },
];

export default function MenuCategoryPage({ params }: { params: { category: string } }) {
  return (
    <div className="min-h-screen bg-purple-10">
      <header className="bg-purple-500 text-white py-4">
        <div className="pl-3 pr-5 flex justify-between items-center">
          <Link href="/menu" className="flex items-center text-white hover:text-purple-200">
            <ChevronLeft />
            <span>Back to Menu</span>
          </Link>
          <h1 className="text-2xl font-bold">{params.category}</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {saltyItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-40 sm:h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-semibold text-purple-800 mb-1 sm:mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 font-medium">${item.price.toFixed(2)}</p>
                <Link
                  href={`/menu/${params.category}/${item.id}`}
                  className="mt-2 sm:mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 text-sm sm:text-base"
                >
                  <Info className="mr-1 sm:mr-2" size={16} />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
