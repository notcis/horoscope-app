import { APP_NAME } from "@/lib/constants";
import { PersonStandingIcon } from "lucide-react";

export default function MenuTitle() {
  const shortAppName = APP_NAME.split(" — ")[0];
  return (
    <h4 className="flex items-center">
      <PersonStandingIcon size={40} className="text-primary" /> {shortAppName}
    </h4>
  );
}
