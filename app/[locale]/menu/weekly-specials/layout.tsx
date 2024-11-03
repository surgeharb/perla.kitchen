import { NavigationMenuHeader } from '@/components/layout/NavigationMenuHeader';

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-purple-10">
      <NavigationMenuHeader title="Weekly Specials" />
      {children}
    </main>
  );
}
