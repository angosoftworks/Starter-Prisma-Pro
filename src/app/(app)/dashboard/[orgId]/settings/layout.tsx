import { Separator } from '@/components/ui/Separator';
import { SettingsNav } from './_PageSections/SettingsNav';
import SettingsHeader from './_PageSections/SettingsHeader';
import routes from '@/lib/config/routes';
import { LayoutProps } from '@/lib/types/types';

export default function SettingsLayout({ children }: LayoutProps) {
  return (
    <div className="md:max-w-2xl">
      <SettingsHeader />
      <Separator className="my-6" />
      <SettingsNav items={routes.routes_dashboard_subroutes.settings} />
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
}
