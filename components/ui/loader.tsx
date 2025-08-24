import { Loader2Icon } from "lucide-react";

export default function Loader() {
  return (
    <div className=" flex h-screen justify-center items-center">
      <Loader2Icon className="w-10 h-10 rounded-full animate-spin" />
    </div>
  );
}
