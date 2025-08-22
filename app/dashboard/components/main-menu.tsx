import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import LightDarkToggle from "@/components/ui/light-dark-toggle";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function MainMenu({ className }: { className?: string }) {
  const handleLogout = () => {
    signOut();
  };

  return (
    <nav
      className={cn("md:bg-muted overflow-auto p-4 flex flex-col", className)}
    >
      <header className=" hidden md:block border-b dark:border-b-black border-b-zinc-300 pb-4">
        <MenuTitle />
      </header>
      <ul className="py-4 grow">
        <MenuItem href="/dashboard">My dashboard</MenuItem>
        <MenuItem href="/dashboard/teams">Teams</MenuItem>
        <MenuItem href="/dashboard/employees">Employees</MenuItem>
        <MenuItem href="/dashboard/account">Account</MenuItem>
        <MenuItem href="/dashboard/settings">Settings</MenuItem>
      </ul>
      <footer className="flex items-center gap-2 ">
        <Avatar>
          <AvatarFallback className=" bg-pink-300 dark:bg-pink-800">
            NC
          </AvatarFallback>
        </Avatar>
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}
