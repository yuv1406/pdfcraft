import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { generateContactMetadata } from '@/lib/seo';
import ContactPageClient from './ContactPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'metadata' });
  return generateContactMetadata('en', {
    title: t('contact.title'),
    description: t('contact.description'),
  });
}

export default async function ContactPage() {
  setRequestLocale('en');
  return <ContactPageClient locale="en" />;
}
