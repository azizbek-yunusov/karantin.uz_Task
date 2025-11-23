import AppLayout from "@/components/layout/app-layout";
import { useUsers } from "@/features/user/store/userStore";
import UsersList from "@/widgets/user/users-list";
import { useEffect } from "react";

const Users = () => {
  const init = useUsers((s) => s.init);

  useEffect(() => {
    init();
  }, []);
  return (
    <AppLayout title="users">
      <UsersList />
    </AppLayout>
  );
};

export default Users;
