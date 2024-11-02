import { MetadataRoute } from 'next';
import { host } from '@/config';
import { Locale, getPathname, routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: make sure all pages are included
  // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
  return [getEntry('/')];
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
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
