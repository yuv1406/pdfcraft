import { setRequestLocale } from 'next-intl/server';
import WorkflowPageClient from './WorkflowPageClient';

export default async function WorkflowPage() {
  setRequestLocale('en');
  return <WorkflowPageClient locale="en" />;
}
