'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import dynamic from 'next/dynamic';

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'always',
    capture_pageview: false,
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export const PostHogPageViewDynamic = dynamic(
  () => import('./pageview').then((module) => module.default),
  {
    ssr: false,
  },
);
