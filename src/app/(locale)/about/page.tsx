import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { generateAboutMetadata } from '@/lib/seo';
import AboutPageClient from './AboutPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'metadata' });
  return generateAboutMetadata('en', {
    title: t('about.title'),
    description: t('about.description'),
  });
}

export default async function AboutPage() {
  setRequestLocale('en');
  return <AboutPageClient locale="en" />;
}
