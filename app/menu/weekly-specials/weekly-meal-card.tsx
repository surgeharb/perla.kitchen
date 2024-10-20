import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { buildSanityImageUrl } from '@/sanity/lib/client';
import { QueryWeeklyMealsResult } from '@/sanity.types';

export const WeeklyMealCard: React.FC<{
  isReversed?: boolean;
  meal: QueryWeeklyMealsResult[number];
}> = ({ isReversed = false, meal }) => (
  <Card>
    <CardContent
      className={cn('p-4 flex items-center gap-3', isReversed ? 'flex-row-reverse' : 'flex')}>
      <div className="flex-grow flex flex-col gap-1">
        <h3 className="text-xl font-semibold">{meal.title}</h3>
        <p className="text-gray-600 text-sm">{meal.description}</p>
        <p className="text-purple-600 font-bold text-lg">€ {meal.price}</p>
      </div>
      {meal.menuItems && meal.menuItems[0] && meal.menuItems[0].image && (
        <Image
          src={buildSanityImageUrl(meal.menuItems[0].image).url()}
          alt={meal.title ?? 'Meal'}
          width={100}
          height={100}
          className="w-24 h-24 object-cover rounded-lg"
        />
      )}
    </CardContent>
  </Card>
);
