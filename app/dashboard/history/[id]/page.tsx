import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getHoroscopeById } from "@/lib/actions/horoscope.action";
import { cn } from "@/lib/utils";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const horoscope = await getHoroscopeById(id);

  if (!horoscope.data) {
    return <div>{horoscope.message}</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>ดวงรายเดือน — {horoscope.data.monthYear}</CardTitle>
          <CardDescription>
            วันเกิด:{" "}
            <span className="font-medium">{horoscope.data?.dob ?? "-"}</span> •
            ราศี:{" "}
            <Badge variant="secondary">{horoscope.data?.zodiac ?? "-"}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">ความรัก</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {horoscope.data?.love ?? "-"}
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">การงาน</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {horoscope.data?.career ?? "-"}
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">การเงิน</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {horoscope.data?.finance ?? "-"}
            </p>
          </section>
          <Separator />
          <section className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-semibold">เลขนำโชคประจำเดือน</div>
            <Badge className="text-base px-3 py-1">
              {horoscope.data?.luckyNumber ?? "-"}
            </Badge>
          </section>
          <Separator />
          <section className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-semibold">สีที่ถูกโฉลก</div>
            <Badge
              className={cn(
                "text-base px-3 py-1",
                `bg-[${horoscope.data?.luckyColorHex}]`
              )}
            >
              {horoscope.data?.luckyColorNameTH ?? "-"}
            </Badge>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
