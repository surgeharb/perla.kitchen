'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export function MenuHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <header className="bg-purple-500 text-white py-4">
      <div className="pl-3 pr-5 flex justify-between items-center">
        <a onClick={router.back} className="flex items-center text-white hover:text-purple-200">
          <ChevronLeft />
          <span>Back</span>
        </a>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </header>
  );
}
