import { Header } from '../(marketing)/_PageSections/Header';
import { LayoutProps } from '@/lib/types/types';
import Footer from '@/components/Footer';

export default async function MarketingLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main className="grid justify-center min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
