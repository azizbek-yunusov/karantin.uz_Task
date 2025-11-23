import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const Pagination = ({ table }: { table: any }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-end space-x-2 py-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon />
      </Button>

      <span className="text-sm text-muted-foreground ml-2">
        {t("page")} {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>
    </div>
  );
};

export default Pagination;
