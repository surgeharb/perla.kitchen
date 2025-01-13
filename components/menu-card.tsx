import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { buildSanityImageUrl } from '@/sanity/lib/client';
import { useIsRTL } from '@/hooks/useIsRTL';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const getMenuImage = (image: SanityImageSource) =>
  buildSanityImageUrl(image, { height: 300, width: 300 });

interface MenuCardProps {
  title: string | null;
  image?: SanityImageSource | null;
  variant?: 'default' | 'banner';
  className?: string;
  href: string;
}

export function MenuCard({ title, image, href, className, variant = 'default' }: MenuCardProps) {
  const isRTL = useIsRTL();

  if (variant === 'banner') {
    return (
      <Link
        href={href}
        className={cn(
          'flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300',
          className,
        )}>
        <div className="flex-shrink-0 flex">
          <div className="w-full relative aspect-[2/0.96]">
            <Image
              src="/images/menu-banner-mixed.png"
              alt="Weekly Menu"
              layout="fill"
              objectFit="cover"
              objectPosition="center 33%"
              priority
            />
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <div className="flex-grow p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-800">{title}</h3>
            {isRTL ? (
              <ChevronLeft className="text-purple-600" />
            ) : (
              <ChevronRight className="text-purple-600" />
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300',
        className,
      )}>
      {!!image && (
        <div className="relative aspect-square w-full">
          <Image
            src={getMenuImage(image).url()}
            alt={title ?? 'Menu Item'}
            blurDataURL={getMenuImage(image).blur(1).url()}
            className="object-cover"
            placeholder="blur"
            fill
          />
        </div>
      )}
      <div className="p-3 flex-1 flex justify-between items-center">
        <h2 className="text-md font-semibold text-purple-800">{title}</h2>
        {isRTL ? (
          <ChevronLeft className="text-purple-600" />
        ) : (
          <ChevronRight className="text-purple-600" />
        )}
      </div>
    </Link>
  );
}
