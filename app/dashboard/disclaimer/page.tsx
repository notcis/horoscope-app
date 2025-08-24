import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";

export default function page() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>เกี่ยวกับเว็บดูดวง</CardTitle>
          <CardDescription>{APP_NAME} เพื่อความบันเทิง</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
          <p>
            เว็บไซต์นี้ใช้โมเดล AI สร้างคำทำนายรายเดือนจากข้อมูลวันเกิดของคุณ
            เนื้อหามีจุดประสงค์เพื่อความบันเทิงและแรงบันดาลใจเท่านั้น
          </p>
          <Separator />
          <Alert>
            <AlertTitle>ข้อจำกัดความรับผิด</AlertTitle>
            <AlertDescription>
              โปรดอย่านำคำทำนายไปใช้ตัดสินใจด้านการแพทย์ กฎหมาย หรือการเงิน
              หากต้องการคำแนะนำเฉพาะทาง โปรดปรึกษาผู้เชี่ยวชาญ
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
