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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await createHoroscope(data.birthday);
    if (!res.success) {
      console.log(res.message);
    }
    console.log(res.data);
  };

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 100);

  return (
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
                        /* disabled={(date) => {
                      return date.getDay() === 0 || date.getDay() === 6;
                    }} */
                        captionLayout="dropdown-buttons"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">ดูดวงเดือนนี้</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
