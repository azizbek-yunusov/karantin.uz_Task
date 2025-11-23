import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { useTranslation } from "react-i18next";
import type { ModalType } from "@/shared/types";
import { useUsers } from "../store/userStore";
import { format } from "date-fns";
import type { User } from "@/entities/user";

const UsersTable = ({
  handleModal,
}: {
  handleModal: (
    type: ModalType,
    state: boolean,
    id?: number | string,
    name?: string
  ) => void;
}) => {
  const { t } = useTranslation();
  const { users } = useUsers();

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: t("first-name"),
    },

    {
      accessorKey: "lastName",
      header: t("last-name"),
    },
    {
      accessorKey: "birthDate",
      header: t("birth-date"),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <span>{format(new Date(user.birthDate), "dd.MM.yyyy")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "gender",
      header: t("gender"),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-2">
            <span>{t(user.gender)}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: t("actions"),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => alert(`Viewing ${user.firstName}`)}
              >
                <Eye /> {t("view")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleModal("edit", true, user.id)}
              >
                <Edit /> {t("update")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleModal("delete", true, user.id)}
              >
                <Trash className="text-red-600" /> {t("delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={users} />;
};

export default UsersTable;
