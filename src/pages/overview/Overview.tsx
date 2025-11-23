import AppLayout from "@/components/layout/app-layout";
import { useTranslation } from "react-i18next";

const Overview = () => {
  const { t } = useTranslation();
  return <AppLayout title="overview">{t("overview")}</AppLayout>;
};

export default Overview;
