import { Locale } from '@/i18n/routing';
import { redirect } from 'next/navigation';

type MainPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function MainPage(props: MainPageProps) {
  const { locale } = await props.params;
  redirect(`/${locale}/menu`);
}
