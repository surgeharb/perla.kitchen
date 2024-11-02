import { MenuHeader } from '@/components/menu-header';

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-purple-10">
      <MenuHeader title="Weekly Specials" />
      {children}
    </main>
  );
}
