import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { generateFaqMetadata } from '@/lib/seo';
import FAQPageClient from './FAQPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'metadata' });
  return generateFaqMetadata('en', {
    title: t('faq.title'),
    description: t('faq.description'),
  });
}

export default async function FAQPage() {
  setRequestLocale('en');
  return <FAQPageClient locale="en" />;
}
