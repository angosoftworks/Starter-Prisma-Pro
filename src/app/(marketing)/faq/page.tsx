import FAQ from '../_PageSections/FAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ'
};

const FAQPage = () => {
  return <FAQ />;
};

export default FAQPage;
