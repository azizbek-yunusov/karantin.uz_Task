import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import AddUser from "../add-user/add-user";
import type { ModalType } from "@/shared/types";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import UsersTable from "./UsersTable";
import UpdateUser from "../update-user/update-user";
import DeleteUser from "../delete-user/delete-user";

const PAGE_URL = "/users";
const UsersList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [modals, setModals] = useState({
    add: false,
    edit: false,
    delete: false,
    view: false,
  });
  const [term, setTerm] = useState<string>("");

  const handleModal = useCallback(
    (type: ModalType, state: boolean, id?: number | string, name?: string) => {
      const url = id
        ? `${PAGE_URL}?${type}=${id}${name ? `&user-name=${name}` : ""}`
        : PAGE_URL;

      navigate(url);
      setModals((prev) => ({ ...prev, [type]: state }));
    },
    [navigate]
  );

  return (
    <div>
      <div className="flex justify-between mb-3 py-3 px-3 bg-white dark:bg-background/95 border rounded-lg">
        <Input
          placeholder={t("search")}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="max-w-xs"
        />
        <Button size="lg" onClick={() => handleModal("add", true)}>
          {t("add-user")}
        </Button>
      </div>
      <UsersTable handleModal={handleModal} />
      <AddUser open={modals.add} onClose={() => handleModal("add", false)} />
      <UpdateUser
        open={modals.edit}
        onClose={() => handleModal("edit", false)}
      />
      <DeleteUser
        open={modals.delete}
        onClose={() => handleModal("delete", false)}
      />
    </div>
  );
};

export default UsersList;
