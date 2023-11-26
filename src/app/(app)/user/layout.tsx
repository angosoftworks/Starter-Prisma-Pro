import { MainLogoText, MainLogoIcon } from '@/components/MainLogo';
import { Separator } from '@/components/ui/Separator';
import { LayoutProps } from '@/lib/types/types';

export default async function UserLayout({ children }: LayoutProps) {
  return (
    <div>
      <header className="p-6 mb-4">
        <div className="flex justify-between items-center">
          <MainLogoText />
        </div>
        <Separator />
      </header>

      <main className="grid justify-center items-center">{children}</main>
    </div>
  );
}
