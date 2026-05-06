import type { Metadata } from 'next';
import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Locale } from '@/lib/i18n/config';
import { generateToolsListMetadata } from '@/lib/seo';
import ToolsPageClient from './ToolsPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'en', namespace: 'metadata' });
  return generateToolsListMetadata('en', {
    title: t('tools.title'),
    description: t('tools.description'),
  });
}

function ToolsPageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-[hsl(var(--color-muted-foreground))]">
        Loading...
      </div>
    </div>
  );
}

export default async function ToolsPage() {
  const locale: Locale = 'en';
  setRequestLocale(locale);

  const { tools } = await import('@/config/tools');
  const { getToolContent } = await import('@/config/tool-content');

  const localizedToolContent = tools.reduce((acc, tool) => {
    const content = getToolContent(locale, tool.id);
    if (content) {
      acc[tool.id] = {
        title: content.title,
        description: content.metaDescription
      };
    }
    return acc;
  }, {} as Record<string, { title: string; description: string }>);

  return (
    <Suspense fallback={<ToolsPageFallback />}>
      <ToolsPageClient locale={locale} localizedToolContent={localizedToolContent} />
    </Suspense>
  );
}
