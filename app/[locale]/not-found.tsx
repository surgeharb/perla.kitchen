// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

import { NotFoundLayout } from '@/components/layout/NotFoundLayout';

export default function NotFound() {
  return <NotFoundLayout />;
}
