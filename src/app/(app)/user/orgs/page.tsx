// list of orgs, has id, name. Need role as well.
import MyTodos from '../_PageSections/MyOrgs';
import { GetTodosByUserId } from '@/lib/API/Database/todos/queries';

export default async function ListTodos() {
  const todos = await GetTodosByUserId();

  return (
    <div>
      <MyTodos todos={todos} />
    </div>
  );
}
