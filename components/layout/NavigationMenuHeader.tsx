'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { LocaleSwitcher } from '../LocaleSwitcher';

export function NavigationMenuHeader({
  title,
  skipBack,
  size = 'default',
}: {
  title: string;
  skipBack?: boolean;
  size?: 'default' | 'large';
}) {
  const router = useRouter();

  return (
    <header
      className={cn(
        'sticky top-0 z-10 backdrop-blur-sm bg-white/80 border-b border-purple-100 px-4 py-2 flex items-center justify-between',
        size === 'large' && 'h-14',
      )}>
      <div className="flex gap-2 items-center">
        {!skipBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={router.back}
            aria-label="Back"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 -ml-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <h1
          className={cn(
            'text-xl font-medium text-slate-900',
            size === 'large' && 'text-purple-800 font-bold',
          )}>
          {title}
        </h1>
      </div>
      <LocaleSwitcher />
    </header>
  );
}
