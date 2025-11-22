import AppLayout from "@/components/layout/app-layout";
import UsersList from "@/features/user/list";
import { useUsers } from "@/features/user/store/userStore";
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
