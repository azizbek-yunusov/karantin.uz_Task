import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUsers } from "../store/userStore";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const DeleteUser = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const id = sp.get("delete");
  const { removeUser } = useUsers();
  const [value, setValue] = useState<string>("");

  const handleDelete = () => {
    if (!value) return;
    removeUser(String(id));
    toast.success(t("deleted-user"));
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("delete-user")}</DialogTitle>
          <DialogDescription>{t("delete-user-description")}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t("delete-user-placeholder")}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {t("close")}
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!value}
            onClick={handleDelete}
            variant="destructive"
          >
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
