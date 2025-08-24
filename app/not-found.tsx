// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto flex items-center justify-center h-screen">
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>ไม่พบหน้าที่ร้องขอ</CardTitle>
          <CardDescription>อาจมีการย้ายหรือลบเนื้อหานี้ไปแล้ว</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Separator />

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">กลับสู่หน้าแรก</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            รหัสข้อผิดพลาด: 404 — Page Not Found
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
