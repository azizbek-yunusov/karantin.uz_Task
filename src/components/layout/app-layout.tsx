import React from "react";
import { Navbar } from "./navbar";
import { useTranslation } from "react-i18next";

const AppLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const {t} = useTranslation();
  return (
    <main className="bg-zinc-50 dark:bg-background/95 w-full">
      <Navbar title={t(title)} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </main>
  );
};

export default AppLayout;
