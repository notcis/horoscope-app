"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTH } from "@/lib/zodiac";
import { createHoroscope } from "@/lib/actions/horoscope.action";
import { useState, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Horoscope } from "@/lib/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function FormHoroscope() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<Horoscope | null | undefined>(null);
  const { data: session } = useSession();

  const handleClickHoroscope = async () => {
    startTransition(async () => {
      const res = await createHoroscope();
      if (!res.success) {
        toast.error(res.message || "Something went wrong. Please try again.");
      }
      setResult(res.data);
    });
  };

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 100);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ดูดวงรายเดือน</CardTitle>
          <CardDescription>
            วันเกิดของคุณ{" "}
            {session?.user.dob ? (
              formatDateTH(session.user.dob)
            ) : (
              <>
                <span>ไม่พบวันเกิด </span>
                <Link
                  className="text-blue-500 underline"
                  href="/dashboard/account"
                >
                  กรุณาตั้งค่าบัญชี
                </Link>
              </>
            )}{" "}
            จากนั้นระบบจะสร้างคำทำนาย “เดือนนี้” ให้คุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            disabled={isPending || !session?.user.dob}
            type="button"
            onClick={handleClickHoroscope}
          >
            {isPending ? "กำลังดูดวง..." : "ดูดวงเดือนนี้"}
          </Button>
        </CardContent>
      </Card>

      {isPending ? (
        <CardSkeleton />
      ) : result ? (
        <Card>
          <CardHeader>
            <CardTitle>ดวงเดือนนี้ — {result.monthYear}</CardTitle>
            <CardDescription>
              วันเกิด: <span className="font-medium">{result.dob}</span> • อายุ:{" "}
              <span className="font-medium">{result.age}</span> • ราศี:{" "}
              <Badge variant="secondary" className="font-medium">
                {result.zodiac}
              </Badge>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">ความรัก</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {result.love}
              </p>
            </section>
            <Separator />
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">การงาน</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {result.career}
              </p>
            </section>
            <Separator />
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">การเงิน</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {result.finance}
              </p>
            </section>
            <Separator />
            <section className="flex flex-wrap items-center gap-3">
              <div className="space-y-2.5">
                <div className="text-sm font-semibold">สีที่ถูกโฉลก</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span
                    className="inline-block h-5 w-5 rounded-full border"
                    style={{ backgroundColor: result.luckyColorHex }}
                    aria-label={result.luckyColorNameTH}
                    title={`${result.luckyColorNameTH} ${result.luckyColorHex}`}
                  />
                  <span>
                    {result.luckyColorNameTH} ({result.luckyColorHex})
                  </span>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="h-8 hidden sm:block"
              />

              <div className="space-y-2.5">
                <div className="text-sm font-semibold">เลขนำโชคประจำเดือน</div>
                <Badge className="text-base px-3 py-1">
                  {result.luckyNumber}
                </Badge>
              </div>
            </section>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}

const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>กำลังดูดวงของท่าน…</CardTitle>
        <CardDescription>โปรดรอเล็กน้อย</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
        <Separator />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
};
