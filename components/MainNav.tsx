import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { SearchMenu } from './search-menu';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex h-16 items-center px-4">
      <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
        <Link
          href="/"
          className="text-sm font-medium text-primary transition-colors hover:text-primary">
          Home
        </Link>
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Blog
        </Link>
        <Link
          href="/menu"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Menu
        </Link>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <SearchMenu />
      </div>
    </div>
  );
}
