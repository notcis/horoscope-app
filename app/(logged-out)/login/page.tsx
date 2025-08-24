"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import { APP_NAME } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  if (session) {
    router.push("/dashboard/horoscope");
  }

  const handleLineLogin = async () => {
    await signIn("line", {
      callbackUrl: "/dashboard/horoscope",
    });
  };
  const handleFacebookLogin = async () => {
    await signIn("facebook", {
      callbackUrl: "/dashboard/horoscope",
    });
  };

  return (
    <>
      {!session ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>เข้าสู่ระบบ</CardTitle>
            <CardDescription>เข้าสู่ระบบเพื่อใช้ {APP_NAME}</CardDescription>
          </CardHeader>
          <CardContent>
            <FormLogin
              handleLineLogin={handleLineLogin}
              handleFacebookLogin={handleFacebookLogin}
            />
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}

type Props = {
  handleLineLogin: () => Promise<void>;
  handleFacebookLogin: () => Promise<void>;
};

const FormLogin = ({ handleLineLogin, handleFacebookLogin }: Props) => {
  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={handleLineLogin}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#00C300] hover:bg-[#00A700] text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#00C300]/50"
      >
        {/* small line chat bubble icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 4h16v10H7l-3 3V4z" fill="currentColor" />
        </svg>
        เข้าสู่ระบบด้วย LINE
      </Button>
      <Button
        type="button"
        onClick={handleFacebookLogin}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#1877F2] hover:bg-[#165FC2] text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#1877F2]/50"
      >
        {/* small facebook "f" icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M15 3h3v4h-3v14h-4V7H9V3h3V1.8C12 0.8 12.7 0 14.5 0 15.8 0 17 0.4 17.9 1.2L18 1.3V3z"
            fill="currentColor"
          />
        </svg>
        เข้าสู่ระบบด้วย Facebook
      </Button>
    </div>
  );
};
