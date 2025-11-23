import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useUsers } from "../store/userStore";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import type {User } from "@/entities/user";

const UpdateUser = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { updateUser, users } = useUsers();
  const { t } = useTranslation();
  const [opens, setOpens] = useState(false);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const id = sp.get("edit");
  const findUser: User | undefined = users?.find((item) => item.id == id);
  const formSchema = z.object({
    firstName: z
      .string()
      .min(2, t("first-name-is-required"))
      .max(20, t("first-name-max-length")),
    lastName: z
      .string()
      .min(2, t("last-name-is-required"))
      .max(20, t("last-name-max-length")),
    birthDate: z.date({ message: t("birth-date-is-required") }),
    gender: z.string().min(1, t("gender-is-required")),
  });

  type FormData = z.infer<typeof formSchema>;

  useEffect(() => {
    if (findUser) {
      setValue("firstName", findUser?.firstName);
      setValue("lastName", findUser?.lastName);
      if (findUser?.birthDate) {
        setValue("birthDate", new Date(findUser.birthDate));
      }
      setValue("gender", findUser?.gender);
    }
  }, [findUser]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const birthDate = watch("birthDate");

  const onSubmit = (data: FormData) => {
    const body = {
      ...data,
      id: String(id),
    };

    updateUser(String(id), body);
    onClose();
    toast.success(t("updated-user"));
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("update-user")}</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid flex-1 gap-6 px-4"
        >
          <FieldGroup>
            <Field>
              <FieldLabel>
                {t("first-name")} <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...register("firstName")}
                className={errors.firstName ? "border-red-500" : ""}
                placeholder={t("first-name-placeholder")}
              />
              <FieldError>{errors.firstName?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>
                {t("last-name")} <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...register("lastName")}
                className={errors.lastName ? "border-red-500" : ""}
                placeholder={t("last-name-placeholder")}
              />
              <FieldError>{errors.lastName?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>
                {t("birth-date")} <span className="text-red-500">*</span>
              </FieldLabel>

              <Popover open={opens} onOpenChange={setOpens}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal"
                  >
                    {birthDate
                      ? format(birthDate, "dd.MM.yyyy")
                      : t("select-date")}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={(date) => {
                      if (date) {
                        setValue("birthDate", date, { shouldValidate: true });
                        setOpens(false);
                      }
                    }}
                    captionLayout="dropdown"
                    fromYear={1950}
                    toYear={2025}
                  />
                </PopoverContent>
              </Popover>

              <FieldError>{errors.birthDate?.message}</FieldError>
            </Field>

            <FieldSet>
              <FieldLabel>{t("gender")}</FieldLabel>
              <RadioGroup
                defaultValue="male"
                className="flex gap-5 w-2/3"
                onValueChange={(value) => setValue("gender", value)}
                value={watch("gender")}
              >
                <Field orientation="horizontal">
                  <RadioGroupItem value="male" id="male" />
                  <FieldLabel htmlFor="male">{t("male")}</FieldLabel>
                </Field>

                <Field orientation="horizontal">
                  <RadioGroupItem value="female" id="female" />
                  <FieldLabel htmlFor="female">{t("female")}</FieldLabel>
                </Field>
              </RadioGroup>
              <FieldError>{errors.gender?.message}</FieldError>
            </FieldSet>
          </FieldGroup>
          <SheetFooter className="flex justify-between">
            <Button size="lg" type="submit">
              {t("save")}
            </Button>
            <SheetClose asChild>
              <Button size="lg" variant="outline">
                {t("close")}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateUser;
