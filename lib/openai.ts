import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateHoroscope = async ({
  birthday,
  zodiacThai,
  monthYearTH,
}: {
  birthday: string;
  zodiacThai: string;
  monthYearTH: string;
}) => {
  const prompt = `
  งานของคุณ:
 เขียนดวงรายเดือนสำหรับเดือน ${monthYearTH} โดยยึด ${zodiacThai} และวันเกิด ${birthday} 
 ครอบคลุม: ความรัก, การงาน, การเงิน, สีที่ถูกโฉลก (ชื่อสีไทย + โค้ด HEX) และเลขนำโชคประจำเดือน (เป็นตัวเลข 2 หลัก เช่น "27")
 ส่งกลับ JSON เท่านั้น ตามสคีม:
{
  "dob": "${birthday}",
  "zodiac": "${zodiacThai}",
  "monthYear": "${monthYearTH}",
  "love": "ข้อความ 2-3 ประโยค",
  "career": "ข้อความ 2-3 ประโยค",
  "finance": "ข้อความ 2-3 ประโยค",
  "luckyColor": { "nameTH": "ชื่อสีไทย", "hex": "#RRGGBB" },
  "luckyNumber": "เลข 2 หลัก"
}
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
        คุณเป็นหมอดูที่เขียนภาษาไทย สุภาพ กระชับ อิงโหราศาสตร์สากลเพื่อความบันเทิง
        หลีกเลี่ยงการทำนายตัวเลขพนัน/การแพทย์/กฎหมาย และอย่ารับประกันเหตุการณ์แน่นอน
        ให้คำแนะนำเชิงปฏิบัติ ปลอดภัย จำกัดแต่ละหัวข้อ 2-3 ประโยค
`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.8,
  });

  const content = response.choices[0].message.content;

  console.log(content);
};

generateHoroscope({
  birthday: "08-04-2531",
  zodiacThai: "เมษ",
  monthYearTH: "มกราคม 2568",
});
