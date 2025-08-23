"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatDateTH } from "@/lib/zodiac";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  birthday: z
    .date()
    .refine((date) => {
      const today = new Date();
      const eighteenYearAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eighteenYearAgo;
    }, "You must be at least 18 years old")
    .optional(),
  name: z.string().optional(),
});

export default function FormAccount({
  initialValues,
}: {
  initialValues: { dob?: Date | null; name?: string | null };
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: initialValues?.dob || undefined,
      name: initialValues?.name || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      form.reset();
      console.log(values);
    });
  };

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>คั้งค่าบัญชี</CardTitle>
        <CardDescription>ปรับแต่งการตั้งค่าบัญชีของคุณ</CardDescription>
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input placeholder="กรุณากรอกชื่อ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">
              {isPending ? "กำลังบันทึก..." : "บันทึก"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
