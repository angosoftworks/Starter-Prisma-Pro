import SideBar from './_PageSections/SideBar';
import Header from './_PageSections/Header';
import { LayoutProps } from '@/lib/types/types';
import { GetUser } from '@/lib/API/Database/user/queries';
import routes from '@/lib/config/routes';
import { redirect } from 'next/navigation';
import { GetSession } from '@/lib/API/Services/auth/session';
import { OrgContextProvider } from '@/lib/utils/OrgContext';

export default async function DashboardLayout({ children }: LayoutProps) {
  const session = await GetSession();
  if (!session) redirect(routes.redirects.auth.requireAuth);

  const user = await GetUser();
  const display_name = user?.display_name;
  const email = user?.email;

  const avatar_url = '';

  return (
    <main className="grid md:grid-cols-[auto_1fr]">
      <OrgContextProvider>
        <SideBar />
        <div>
          <Header email={email} display_name={display_name} avatar_url={avatar_url} />
          <div className="m-6">{children}</div>
        </div>
      </OrgContextProvider>
    </main>
  );
}
