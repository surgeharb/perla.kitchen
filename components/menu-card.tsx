import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { buildSanityImageUrl } from '@/sanity/lib/client';
import { Link } from '@/i18n/routing';

const getMenuImage = (image: SanityImageSource) =>
  buildSanityImageUrl(image, { height: 300, width: 300 });

interface MenuCardProps {
  title: string | null;
  image?: SanityImageSource | null;
  variant?: 'default' | 'banner';
  href: string;
}

export function MenuCard({ title, image, href, variant = 'default' }: MenuCardProps) {
  if (variant === 'banner') {
    return (
      <Link
        href={href}
        className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex-shrink-0 flex">
          <div className="w-full h-32 relative">
            <Image
              src="/images/menu-banner.jpeg"
              alt="Weekly Menu"
              layout="fill"
              objectFit="cover"
              objectPosition="center 35%"
              priority
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-grow p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-purple-800">{title}</h3>
            <ChevronRight className="text-purple-600" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
        <ChevronRight className="text-purple-600" />
      </div>
    </Link>
  );
}
