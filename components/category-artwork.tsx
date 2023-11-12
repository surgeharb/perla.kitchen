import Image from 'next/image';
import { cn } from '@/lib/utils';

type Category = {
  name: string;
  cover: string;
};

interface CategoryArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  category: Category;
  aspectRatio?: 'portrait' | 'square';
  hideText?: boolean;
  width?: number;
  height?: number;
}

export function CategoryArtwork({
  category,
  aspectRatio = 'portrait',
  width,
  height,
  className,
  hideText,
  ...props
}: CategoryArtworkProps) {
  return (
    <div className={cn('space-y-3', className)} {...props}>
      <div className="overflow-hidden rounded-lg">
        <Image
          src={category.cover}
          alt={category.name}
          width={width}
          height={height}
          className={cn(
            'h-auto w-auto object-cover transition-all hover:scale-105',
            aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
          )}
        />
      </div>
      {!hideText && (
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none text-center">{category.name}</h3>
        </div>
      )}
    </div>
  );
}
