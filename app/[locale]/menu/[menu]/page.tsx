import React from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import { QueryMenuItems } from '@/sanity/queries/menu';
import { QueryMenuItemsResult } from '@/sanity.types';
import { NavigationMenuHeader } from '@/components/layout/NavigationMenuHeader';
import { MenuCard } from '@/components/menu-card';
import { Locale } from '@/i18n/routing';

async function getMenuItems(menu: string, language: Locale): Promise<QueryMenuItemsResult> {
  return sanityFetch({
    query: QueryMenuItems,
    params: { menu, language },
  });
}

export default async function MenuSinglePage(props: {
  params: Promise<{ menu: string; locale: Locale }>;
}) {
  const params = await props.params;
  const menuItems = await getMenuItems(params.menu, params.locale);

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="min-h-screen bg-purple-10">
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold">No menu items found</h1>
        </div>
      </div>
    );
  }

  const menu = menuItems[0].menu;

  return (
    <>
      <NavigationMenuHeader title={menu?.title ?? 'Menu'} />
      <section className="container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {menuItems.map((item, index) => (
            <MenuCard
              key={item._id}
              title={item.title}
              image={item.image}
              href={`/menu/${params.menu}/${item.slug?.current}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
