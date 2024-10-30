'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

export function MenuHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm bg-white/80 border-b border-purple-100 px-4 py-2">
      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={router.back}
          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 -ml-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium text-slate-900">{title}</h1>
      </div>
    </header>
  );
}
