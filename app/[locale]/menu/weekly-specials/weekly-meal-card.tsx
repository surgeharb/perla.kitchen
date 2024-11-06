import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { buildSanityImageUrl } from '@/sanity/lib/client';
import { QueryWeeklyMealsResult } from '@/sanity.types';

type WeeklyMealCardProps = {
  isReversed?: boolean;
  meal: QueryWeeklyMealsResult[number];
};

export function WeeklyMealCard({ isReversed = false, meal }: WeeklyMealCardProps) {
  const firstMenuItem = meal.menuItems && meal.menuItems[0];

  if (!firstMenuItem) {
    return null;
  }

  return (
    <Link href={`/menu/weekly-specials/${firstMenuItem.slug?.current}`}>
      <Card>
        <CardContent
          className={cn('p-4 flex items-center gap-3', isReversed ? 'flex-row-reverse' : 'flex')}>
          <div className="flex-grow flex flex-col gap-1">
            <h3 className="text-xl font-semibold">{firstMenuItem.title}</h3>
            <p className="text-gray-600 text-sm">{meal.description}</p>
            <p className="text-purple-600 font-bold text-lg">€ {meal.price}</p>
          </div>
          {firstMenuItem.image && (
            <Image
              src={buildSanityImageUrl(firstMenuItem.image).url()}
              alt={firstMenuItem.title ?? 'Meal'}
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
