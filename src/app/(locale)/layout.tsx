import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { generateHomeMetadata } from '@/lib/seo';
import { fontVariables } from '@/lib/fonts';
import { SkipLink } from '@/components/common/SkipLink';
import '@/app/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'metadata' });
  return generateHomeMetadata('en', {
    title: t('home.title'),
    description: t('home.description'),
  });
}

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale('en');
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div lang="en" dir="ltr" className={`${fontVariables} min-h-screen bg-background text-foreground antialiased font-sans`}>
        <SkipLink targetId="main-content">Skip to main content</SkipLink>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
