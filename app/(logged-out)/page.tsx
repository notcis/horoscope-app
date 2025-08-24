import { Button } from "@/components/ui/button";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <>
      <h5 className="flex gap-2 items-center">
        <PersonStandingIcon size={50} className=" text-pink-500" />
        {APP_NAME}
      </h5>
      <p className=" text-sm">{APP_DESCRIPTION}</p>
      <div className="flex gap-2 items-center">
        <Button asChild>
          <Link href="/login">เข้าสู่ระบบ</Link>
        </Button>
        {/*  <small>or</small> */}
        {/* <Button variant="outline" asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button> */}
      </div>
    </>
  );
}
