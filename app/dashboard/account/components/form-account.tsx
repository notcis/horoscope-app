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
  FormDescription,
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
import { updateUser } from "@/lib/actions/users.action";
import { cn } from "@/lib/utils";
import { changeTimezoneToThai, formatDateTH } from "@/lib/zodiac";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

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

  name: z.string().min(2, "Name must be at least 2 characters").max(50),
});

export default function FormAccount() {
  const { data: session, update } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: session?.user?.dob ? new Date(session.user.dob) : undefined,
      name: session?.user?.name || "",
    },
  });

  useEffect(() => {
    if (session) {
      form.reset({
        birthday: session.user.dob ? new Date(session.user.dob) : undefined,
        name: session.user.name || "",
      });
    }
  }, [session, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const res = await updateUser({
        dob: changeTimezoneToThai(values.birthday),
        name: values.name,
      });
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      if (res.data) {
        const updatedSession = {
          ...session,
          user: {
            ...session?.user,
            dob: res.data.dob,
            name: res.data.name,
          },
        };
        await update(updatedSession);
        toast.success("บันทึกข้อมูลสำเร็จ");
        router.push("/dashboard/horoscope");
      }
    });
  };

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>ตั้งค่าบัญชี</CardTitle>
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
                  <FormDescription>
                    กรุณาเลือกวันเกิดจริงของคุณ เพื่อความถูกต้องในการดูดวง
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl className="w-min">
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
