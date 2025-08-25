import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ADDRESS,
  APP_DOMAIN,
  APP_NAME,
  CONTACT_EMAIL,
  LAST_UPDATED_TH,
} from "@/lib/constants";
import Link from "next/link";

const sections = [
  { id: "intro", title: "บทนำ" },
  { id: "data-we-collect", title: "ข้อมูลที่เราเก็บ" },
  { id: "sources", title: "แหล่งที่มาของข้อมูล" },
  { id: "purposes", title: "วัตถุประสงค์ในการใช้ข้อมูล" },
  { id: "cookies", title: "คุกกี้และเทคโนโลยีติดตามผล" },
  { id: "sharing", title: "การเปิดเผย/แบ่งปันข้อมูล" },
  { id: "transfer", title: "การโอนข้อมูลไปต่างประเทศ" },
  { id: "retention", title: "การเก็บรักษาและระยะเวลา" },
  { id: "rights", title: "สิทธิของเจ้าของข้อมูล (PDPA)" },
  { id: "security", title: "ความปลอดภัยของข้อมูล" },
  { id: "minors", title: "เด็กและผู้เยาว์" },
  { id: "consent", title: "การขอความยินยอมและการเพิกถอน" },
  { id: "contact", title: "ช่องทางติดต่อเรา" },
  { id: "changes", title: "การเปลี่ยนแปลงนโยบาย" },
];

export const metadata = {
  title: `นโยบายความเป็นส่วนตัว | ${APP_NAME}`,
  description: `${APP_NAME} ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้ อธิบายถึงข้อมูลที่เก็บ วิธีใช้ข้อมูล สิทธิของเจ้าของข้อมูล และช่องทางติดต่อ ตามกฎหมาย PDPA/มาตรฐานสากล`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `นโยบายความเป็นส่วนตัว | ${APP_NAME}`,
    description: `${APP_NAME} ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้ อธิบายถึงข้อมูลที่เก็บ วิธีใช้ข้อมูล สิทธิของเจ้าของข้อมูล และช่องทางติดต่อ ตามกฎหมาย PDPA/มาตรฐานสากล`,
    url: `${APP_DOMAIN}/privacy`,
    siteName: APP_NAME,
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          นโยบายความเป็นส่วนตัว
        </h1>
        <p className="mt-2 text-muted-foreground">
          ประกาศโดย {APP_NAME} | ปรับปรุงล่าสุด: {LAST_UPDATED_TH}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-10">
        {/* Sidebar TOC */}
        <aside className="md:col-span-3">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-base">สารบัญ</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2 text-sm">
                {sections.map((s) => (
                  <div key={s.id}>
                    <Link
                      href={`#${s.id}`}
                      className="text-primary hover:underline"
                    >
                      {s.title}
                    </Link>
                  </div>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        <section className="md:col-span-7 space-y-8">
          <Card id="intro">
            <CardHeader>
              <CardTitle>บทนำ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                {APP_NAME} (ต่อไปนี้เรียกว่า “เรา”)
                ให้ความสำคัญและเคารพในความเป็นส่วนตัวของผู้ใช้บริการทุกท่าน
                นโยบายฉบับนี้อธิบายถึงประเภทของข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
                วิธีการใช้งาน การเปิดเผย การเก็บรักษา และสิทธิของท่าน
                ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
                รวมถึงแนวปฏิบัติที่สอดคล้องกับมาตรฐานสากล
              </p>
              <p>
                นโยบายนี้ครอบคลุมถึงการใช้งานเว็บไซต์ {APP_DOMAIN}{" "}
                รวมถึงบริการที่เชื่อมต่อ เช่น การเข้าสู่ระบบผ่าน Facebook Login,
                การสมัครสมาชิก, การติดต่อฝ่ายสนับสนุน และการใช้งานฟีเจอร์อื่น ๆ
                ของเรา
              </p>
            </CardContent>
          </Card>
          <Card id="data-we-collect">
            <CardHeader>
              <CardTitle>ข้อมูลที่เราเก็บ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <span className="font-medium">ข้อมูลบัญชี/ระบุตัวตน:</span>{" "}
                  ชื่อ, นามสกุล, อีเมล, รูปโปรไฟล์,
                  รหัสผู้ใช้จากผู้ให้บริการภายนอก (เช่น Facebook User ID)
                  และข้อมูลที่ผู้ใช้ยินยอมให้เราเข้าถึงผ่าน Facebook Login
                  ตามสิทธิ์ที่อนุมัติ (เช่น public_profile, email)
                </li>
                <li>
                  <span className="font-medium">ข้อมูลติดต่อ:</span> อีเมล,
                  เบอร์โทรศัพท์ (ถ้ามี), ช่องทางติดต่ออื่น ๆ ที่ผู้ใช้ให้ไว้
                </li>
                <li>
                  <span className="font-medium">ข้อมูลการใช้งาน:</span>{" "}
                  บันทึกกิจกรรมการใช้งาน (usage logs), ประเภทอุปกรณ์,
                  เบราว์เซอร์, ระบบปฏิบัติการ, IP address, session identifiers,
                  เวลาเข้าใช้งาน และหน้าที่เข้าชม
                </li>
                <li>
                  <span className="font-medium">คุกกี้/เทคโนโลยีติดตามผล:</span>{" "}
                  คุกกี้เชิงการทำงาน (functional), เชิงวิเคราะห์ (analytics),
                  และเชิงประสิทธิภาพ (performance) ตามความจำเป็น
                </li>
                <li>
                  <span className="font-medium">
                    ข้อมูลอื่น ๆ ที่ผู้ใช้ส่งให้เราโดยสมัครใจ:
                  </span>{" "}
                  ข้อความแบบฟอร์มติดต่อ, ไฟล์แนบ (ถ้ามี)
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card id="sources">
            <CardHeader>
              <CardTitle>แหล่งที่มาของข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-inside list-disc space-y-2">
                <li>
                  ได้จากผู้ใช้โดยตรงผ่านแบบฟอร์ม, การลงทะเบียน, หรือ Facebook
                  Login
                </li>
                <li>ได้จากการใช้งานเว็บไซต์/แอปของเรา (เช่น logs, คุกกี้)</li>
                <li>ได้จากผู้ให้บริการภายนอกหรือพาร์ทเนอร์ที่ผู้ใช้ยินยอม</li>
              </ul>
            </CardContent>
          </Card>
          <Card id="purposes">
            <CardHeader>
              <CardTitle>วัตถุประสงค์ในการใช้ข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-inside list-disc space-y-2">
                <li>
                  ให้บริการหลักของระบบ เช่น ยืนยันตัวตน, จัดการบัญชี,
                  และประสบการณ์ใช้งานส่วนบุคคล
                </li>
                <li>
                  ปรับปรุงคุณภาพและประสิทธิภาพของเว็บไซต์/แอป
                  ผ่านการวิเคราะห์เชิงสถิติ
                </li>
                <li>
                  สื่อสารกับผู้ใช้ เช่น แจ้งข่าวสารการให้บริการ,
                  ตอบคำถามฝ่ายสนับสนุน
                </li>
                <li>
                  ปฏิบัติตามกฎหมาย ข้อกำหนด และกระบวนการยุติธรรมที่เกี่ยวข้อง
                </li>
                <li>
                  การป้องกันการทุจริต ความปลอดภัย และการตรวจสอบเหตุการณ์ผิดปกติ
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card id="cookies">
            <CardHeader>
              <CardTitle>คุกกี้และเทคโนโลยีติดตามผล</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันเพื่อให้เว็บไซต์ทำงานได้อย่างเหมาะสม
                จดจำการตั้งค่า และช่วยวิเคราะห์ประสิทธิภาพการใช้งาน
                ท่านสามารถตั้งค่าเบราว์เซอร์เพื่อปฏิเสธคุกกี้บางประเภทได้
                แต่อาจทำให้บางฟีเจอร์ทำงานได้ไม่สมบูรณ์
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  คุกกี้ที่จำเป็นต่อการทำงาน (strictly necessary/functional)
                </li>
                <li>คุกกี้วิเคราะห์และวัดผล (analytics/performance)</li>
              </ul>
            </CardContent>
          </Card>
          <Card id="sharing">
            <CardHeader>
              <CardTitle>การเปิดเผย/แบ่งปันข้อมูล</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-inside list-disc space-y-2">
                <li>
                  ผู้ประมวลผลข้อมูล (data processors) ที่ให้บริการโฮสติ้ง, เก็บ
                  log, วิเคราะห์ระบบ ตามสัญญา
                </li>
                <li>
                  ผู้ให้บริการยืนยันตัวตน/โซเชียลล็อกอิน (เช่น Facebook Login)
                  ตามสิทธิ์ที่ท่านยอมรับ
                </li>
                <li>
                  หน่วยงานรัฐ/กำกับดูแล
                  เมื่อมีกฎหมายบังคับหรือมีคำสั่งตามกระบวนการยุติธรรม
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                เราไม่จำหน่าย (sell) ข้อมูลส่วนบุคคลของท่าน
                และจะเปิดเผยเฉพาะเท่าที่จำเป็นตามวัตถุประสงค์ที่ระบุ
              </p>
            </CardContent>
          </Card>
          <Card id="transfer">
            <CardHeader>
              <CardTitle>การโอนข้อมูลไปต่างประเทศ</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                หากมีการโอนข้อมูลไปยังเซิร์ฟเวอร์หรือนิติบุคคลในต่างประเทศ
                เราจะดำเนินการตามมาตรการคุ้มครองข้อมูลที่เหมาะสม เช่น
                สัญญามาตรฐานหรือข้อผูกพันตามกฎหมายที่ใช้บังคับ
                เพื่อให้การคุ้มครองไม่ต่ำกว่ามาตรฐานที่กฎหมายไทยกำหนด
              </p>
            </CardContent>
          </Card>
          <Card id="retention">
            <CardHeader>
              <CardTitle>การเก็บรักษาและระยะเวลา</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                เราจะเก็บรักษาข้อมูลส่วนบุคคลเท่าที่จำเป็นต่อวัตถุประสงค์ในการประมวลผล
                โดยคำนึงถึงกรอบเวลาตามกฎหมายที่เกี่ยวข้อง หลังพ้นกำหนด เราจะลบ
                ทำให้ไม่สามารถระบุตัวตนได้
                หรือจัดเก็บต่อไปเพื่อวัตถุประสงค์ทางกฎหมายอันชอบธรรม
              </p>
            </CardContent>
          </Card>
          <Card id="rights">
            <CardHeader>
              <CardTitle>สิทธิของเจ้าของข้อมูล (PDPA)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-inside list-disc space-y-2">
                <li>สิทธิขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคล</li>
                <li>สิทธิขอให้โอนย้ายข้อมูล</li>
                <li>สิทธิขอให้แก้ไขข้อมูลให้ถูกต้อง เป็นปัจจุบัน และสมบูรณ์</li>
                <li>สิทธิคัดค้านหรือขอให้ระงับการประมวลผลในบางกรณี</li>
                <li>สิทธิขอให้ลบหรือทำลายข้อมูลเมื่อไม่มีความจำเป็น</li>
                <li>
                  สิทธิถอนความยินยอม
                  โดยไม่ส่งผลต่อการประมวลผลที่ชอบด้วยกฎหมายก่อนการถอน
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                ท่านสามารถใช้สิทธิตามช่องทางติดต่อที่ระบุไว้ด้านล่าง
                เราจะตอบกลับภายในระยะเวลาที่เหมาะสมตามกฎหมาย
              </p>
            </CardContent>
          </Card>
          <Card id="security">
            <CardHeader>
              <CardTitle>ความปลอดภัยของข้อมูล</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                เรานำมาตรการด้านเทคนิคและองค์กร (technical & organizational
                measures) มาใช้เพื่อปกป้องข้อมูลส่วนบุคคล เช่น
                การเข้ารหัสบนเครือข่าย (HTTPS/TLS), การจำกัดสิทธิ์เข้าถึง,
                การบันทึกเหตุการณ์ (audit logs)
                และการทดสอบ/ทบทวนมาตรการอย่างสม่ำเสมอ
              </p>
            </CardContent>
          </Card>
          <Card id="minors">
            <CardHeader>
              <CardTitle>เด็กและผู้เยาว์</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                หากบริการของเรามีการเก็บข้อมูลจากผู้เยาว์
                เราจะดำเนินการตามข้อกำหนดของกฎหมายที่บังคับใช้
                รวมถึงการขอความยินยอมจากผู้ปกครองในกรณีที่จำเป็น
                หากท่านเชื่อว่ามีการเก็บข้อมูลผู้เยาว์โดยไม่ได้ตั้งใจ
                โปรดติดต่อเราเพื่อดำเนินการแก้ไขหรือลบข้อมูล
              </p>
            </CardContent>
          </Card>
          <Card id="consent">
            <CardHeader>
              <CardTitle>การขอความยินยอมและการเพิกถอน</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                ในกรณีที่กิจกรรมประมวลผลต้องอาศัยความยินยอม
                เราจะขอความยินยอมอย่างชัดแจ้งและโปร่งใส
                ท่านสามารถถอนความยินยอมได้ทุกเมื่อผ่านการตั้งค่าบัญชี
                หรือแจ้งมายังเราโดยตรง
              </p>
            </CardContent>
          </Card>
          <Card id="contact">
            <CardHeader>
              <CardTitle>ช่องทางติดต่อเรา</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>หากมีคำถาม ข้อเสนอแนะ หรือคำขอใช้สิทธิ โปรดติดต่อ:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <span className="font-medium">หน่วยงาน/แอป:</span> {APP_NAME}
                </li>
                <li>
                  <span className="font-medium">อีเมลติดต่อ:</span>{" "}
                  <Link
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-primary hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </Link>
                </li>
                <li>
                  <span className="font-medium">ที่อยู่:</span> {ADDRESS}
                </li>
                <li>
                  <span className="font-medium">
                    เจ้าหน้าที่คุ้มครองข้อมูล (ถ้ามี):
                  </span>{" "}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card id="changes">
            <CardHeader>
              <CardTitle>การเปลี่ยนแปลงนโยบาย</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                เราอาจปรับปรุงนโยบายฉบับนี้เป็นครั้งคราวเพื่อให้เหมาะสมกับบริการและกฎหมายที่เปลี่ยนแปลง
                เราจะแจ้งให้ทราบโดยการปรับวันที่ ปรับปรุงล่าสุด
                ที่ส่วนบนของหน้านี้ หรือแจ้งผ่านช่องทางที่เหมาะสม
              </p>
            </CardContent>
          </Card>

          <Separator />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. สงวนลิขสิทธิ์
          </p>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Privacy Policy | ${APP_NAME}`,
            url: `${APP_DOMAIN}/privacy`,
            inLanguage: "th",
            dateModified: new Date().toISOString(),
            isPartOf: {
              "@type": "WebSite",
              name: APP_NAME,
              url: APP_DOMAIN,
            },
            about: {
              "@type": "Thing",
              name: "นโยบายความเป็นส่วนตัว (Privacy Policy)",
            },
          }),
        }}
      />
    </div>
  );
}
