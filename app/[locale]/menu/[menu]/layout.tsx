import { QueryMenusResult } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/client';
import { QueryMenus } from '@/sanity/queries/menu';

async function getMenus(): Promise<QueryMenusResult> {
  return sanityFetch({
    query: QueryMenus,
  });
}

export async function generateStaticParams() {
  const menus = await getMenus();
  return menus.map((menu) => ({ menu: menu.slug?.current }));
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-purple-10">{children}</main>;
}