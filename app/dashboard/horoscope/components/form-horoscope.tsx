"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
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

const formSchema = z.object({
  birthday: z.date().refine((date) => {
    const today = new Date();
    const eighteenYearAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return date <= eighteenYearAgo;
  }, "You must be at least 18 years old"),
});

export default function FormHoroscope() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<Horoscope | null | undefined>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const res = await createHoroscope(data.birthday);
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
            เลือกวันเกิด จากนั้นระบบจะสร้างคำทำนาย “เดือนปัจจุบัน” ให้คุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>วันเดือนปีเกิด</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              formatDateTH(field.value)
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          defaultMonth={field.value}
                          selected={field.value}
                          onSelect={field.onChange}
                          fixedWeeks
                          weekStartsOn={1}
                          fromDate={dobFromDate}
                          toDate={new Date()}
                          captionLayout="dropdown-buttons"
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit">
                {isPending ? "กำลังดูดวง..." : "ดูดวงเดือนนี้"}
              </Button>
            </form>
          </Form>
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
