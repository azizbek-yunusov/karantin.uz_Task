import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { langs } from "@/shared/lib/data";
import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LangToggle() {
  const { i18n } = useTranslation();
  const changeLang = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="lang">
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {langs.map((item) => (
          <DropdownMenuItem
            className="flex justify-between"
            onClick={() => changeLang(item.lang)}
            key={item.id}
          >
            {item.title}
            {i18n.language === item.lang && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}