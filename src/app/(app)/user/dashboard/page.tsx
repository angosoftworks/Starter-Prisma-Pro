import MyRoles from '../_PageSections/MyRoles';
import PlaceHolder from '../_PageSections/PlaceHolder';
import { GetRolesByUserId } from '@/lib/API/Database/roles/queries';

export default async function UserDashboard() {
  const roles = await GetRolesByUserId();

  return (
    <div>
      <MyRoles roles={roles} />
      <PlaceHolder />
    </div>
  );
}
