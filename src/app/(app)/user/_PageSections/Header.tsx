import { MainLogoText, MainLogoIcon } from '@/components/MainLogo';
import { Separator } from '@/components/ui/Separator';
import { Nav } from '@/components/NavBar';
import routes from '@/lib/config/routes';

export default async function HeaderUser() {
  return (
    <div>
      <header className="p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <MainLogoText href="/user/dashboard" />
          <Nav items={routes.routes_user} />
        </div>
        <Separator />
      </header>
    </div>
  );
}
