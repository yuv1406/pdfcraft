import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { generatePrivacyMetadata } from '@/lib/seo';
import PrivacyPageClient from './PrivacyPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'metadata' });
  return generatePrivacyMetadata('en', {
    title: t('privacy.title'),
    description: t('privacy.description'),
  });
}

export default async function PrivacyPage() {
  setRequestLocale('en');
  return <PrivacyPageClient locale="en" />;
}
