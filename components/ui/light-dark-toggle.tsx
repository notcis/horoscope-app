"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { MoonIcon, SunIcon } from "lucide-react";

type Props = {
  className?: string;
};

export default function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleClick = () => {
    setIsDarkMode((prevValue) => !prevValue);
    document.body.classList.toggle("dark");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className} onClick={handleClick}>
          {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </TooltipTrigger>
        <TooltipContent>
          {isDarkMode ? "Enable light mode" : "Enable dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
