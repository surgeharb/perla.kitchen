import { MetadataRoute } from 'next';
import { Locale, getPathname, routing } from '@/i18n/routing';
import { QueryMenuItemsResult, QueryMenusResult } from '@/sanity.types';
import { QueryMenuItems, QueryMenus } from '@/sanity/queries/menu';
import { sanityFetch } from '@/sanity/lib/client';
import { host } from '@/config';

async function getMenus(): Promise<QueryMenusResult> {
  return sanityFetch({
    query: QueryMenus,
  });
}

async function getMenuItems(menu: string): Promise<QueryMenuItemsResult> {
  return sanityFetch({
    query: QueryMenuItems,
    params: { menu },
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const menus = await getMenus();
  const menuEntries = menus.map((menu) => getEntry(`/menu/${menu.slug?.current}`, menu._updatedAt));

  const menuItemEntries = await Promise.all(
    menus.flatMap(async (menu) => {
      const items = await getMenuItems(menu.slug?.current ?? '');
      return items.map((item) =>
        getEntry(`/menu/${menu.slug?.current}/${item.slug?.current}`, item._updatedAt),
      );
    }),
  );

  return [
    getEntry('/menu'),
    getEntry('/menu/weekly-specials'),
    ...menuEntries,
    ...menuItemEntries.flat(),
  ];
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntry(href: Href, lastModified?: string) {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
