"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import liff from "@line/liff";
import { useEffect, useState } from "react";

type Profile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export default function LiffPage() {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inClient, setInClient] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
        setInClient(liff.isInClient());

        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href });
          return;
        }

        const p = await liff.getProfile();
        setProfile({
          userId: p.userId,
          displayName: p.displayName,
          pictureUrl: p.pictureUrl ?? undefined,
          statusMessage: p.statusMessage ?? undefined,
        });

        setReady(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError(e?.message ?? "LIFF init failed");
      }
    })();
  }, []);

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  const sendHello = async () => {
    try {
      if (!liff.isInClient()) {
        alert("ต้องเปิดในแอป LINE เท่านั้นถึงจะส่งข้อความได้");
        return;
      }

      // ตรวจสอบว่า API ส่งข้อความรองรับบน client นี้หรือไม่
      if (!liff.isApiAvailable?.("sendMessages")) {
        alert("ฟีเจอร์ส่งข้อความไม่รองรับบนอุปกรณ์นี้");
        return;
      }

      await liff.sendMessages([
        {
          type: "text",
          text: `สวัสดี ${profile?.displayName ?? ""} 👋 จาก LIFF`,
        },
      ]);
      alert("ส่งข้อความเรียบร้อยแล้ว");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const msg = e?.message ?? String(e);

      // ตรวจสอบข้อผิดพลาดที่เกี่ยวกับสิทธิ์/สโคป
      if (/permission|scope|not in liff app scope/i.test(msg)) {
        alert(
          "ส่งข้อความไม่สำเร็จ: แอป LIFF ยังไม่มีสิทธิ์ส่งข้อความ\n\nแนวทางแก้ไข:\n" +
            "1) ไปที่ LINE Developers Console → เลือก Channel (Messaging API) → LIFF\n" +
            "   - ตรวจสอบว่ามีการสร้าง LIFF app และใช้ LIFF ID ตัวเดียวกับที่อยู่ใน NEXT_PUBLIC_LIFF_ID\n" +
            "2) ตรวจสอบว่า Channel นั้นเปิดใช้งาน Messaging API และเชื่อม LIFF app กับ Channel เดียวกัน\n" +
            "3) ทดสอบจากแอป LINE (ไม่ใช่ browser) และรีสตาร์ท LIFF ถ้าจำเป็น\n\nข้อผิดพลาดจากระบบ: " +
            msg
        );
        return;
      }

      alert(`ส่งข้อความไม่สำเร็จ: ${msg}`);
    }
  };

  const shareSomething = async () => {
    try {
      if (!liff.isApiAvailable("shareTargetPicker")) {
        alert("อุปกรณ์นี้ยังไม่รองรับ shareTargetPicker");
        return;
      }
      await liff.shareTargetPicker([
        { type: "text", text: "ลองแชร์จาก LIFF 🎉" },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      alert(`แชร์ไม่สำเร็จ: ${e?.message ?? e}`);
    }
  };

  if (error) {
    return (
      <main className="min-h-svh p-6 grid place-items-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>เกิดข้อผิดพลาด</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="min-h-svh p-6 grid place-items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>กำลังโหลด LIFF…</CardTitle>
            <CardDescription>กำลังตรวจสอบสถานะการล็อกอิน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 w-full rounded bg-muted">
              <div className="h-2 w-2/3 animate-pulse rounded bg-foreground/20" />
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-svh p-6 grid place-items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>LIFF Demo (shadcn/ui)</CardTitle>
          <CardDescription>
            ตัวอย่างดึงโปรไฟล์และส่งข้อความกลับเข้าแชทจาก LIFF
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {profile?.pictureUrl ? (
                <AvatarImage src={profile.pictureUrl} alt="profile" />
              ) : (
                <AvatarFallback>
                  {profile?.displayName?.slice(0, 2) ?? "US"}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <div className="text-base font-semibold">
                {profile?.displayName ?? "ผู้ใช้"}
              </div>
              <div className="text-sm text-muted-foreground break-all">
                {profile?.userId}
              </div>
              {profile?.statusMessage && (
                <div className="text-sm italic mt-1">
                  {profile.statusMessage}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button onClick={sendHello} className="rounded-2xl">
              ส่ง “สวัสดี”
            </Button>
            <Button
              onClick={shareSomething}
              variant="secondary"
              className="rounded-2xl"
            >
              แชร์ให้เพื่อน
            </Button>
            <Button onClick={logout} variant="outline" className="rounded-2xl">
              ออกจากระบบ
            </Button>
          </div>

          {!inClient && (
            <Alert className="mt-2">
              <AlertTitle>โหมด Browser</AlertTitle>
              <AlertDescription>
                ตอนนี้ไม่ได้เปิดจากในแอป LINE — ฟังก์ชันส่งข้อความจะใช้งานไม่ได้
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
