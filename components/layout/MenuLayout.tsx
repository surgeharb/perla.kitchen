export function MenuLayout({ children }: { children: React.ReactNode }) {
  return <main className="container mx-auto p-4 flex flex-col gap-4">{children}</main>;
}
