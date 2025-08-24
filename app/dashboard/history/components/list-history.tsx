import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Horoscope } from "@/lib/generated/prisma";

export default function ListHistory({ items }: { items: Horoscope[] | [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ประวัติการดูดวง</CardTitle>
        <CardDescription>ผลดูดวงที่บันทึกไว้ย้อนหลัง</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground">ยังไม่มีประวัติ</div>
        ) : (
          items.map((it, idx) => (
            <div key={idx} className="rounded-xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-sm font-semibold">{it.monthYear}</div>
                  <div className="text-xs text-muted-foreground">
                    สีที่ถูกโฉลก :{" "}
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border"
                      style={{ backgroundColor: it.luckyColorHex }}
                      aria-label={it.luckyColorNameTH}
                      title={`${it.luckyColorNameTH} ${it.luckyColorHex}`}
                    />{" "}
                    {it.luckyColorNameTH} • ราศี :{" "}
                    <Badge variant="secondary">{it.zodiac}</Badge>
                  </div>
                </div>
                <Badge className="text-base">{it.luckyNumber}</Badge>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center gap-3">
                <Button asChild size="sm" variant="secondary">
                  <a href={`/dashboard/history/${it.id}`}>ดูรายละเอียด</a>
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
