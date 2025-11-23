import { LangToggle } from "../ui/lang-togle";
import { ModeToggle } from "../ui/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 max-w-full  z-10 w-full bg-background/95 dark:bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-3 sm:mx-4 py-3 flex items-center">
        <div className="flex items-center space-x-4 lg:space-x-5">
          <SidebarTrigger />
          <h1 className="font-bold text-2xl">{title}</h1>
        </div>
        <div className="flex flex-1 space-x-3 items-center justify-end">
          <ModeToggle />
          <LangToggle />
        </div>
      </div>
    </header>
  );
}
