// lib/zodiac.ts
import { getDate, getMonth, intervalToDuration, addMonths } from "date-fns";
import { toZonedTime, formatInTimeZone } from "date-fns-tz";
import { th } from "date-fns/locale";

export function getThaiZodiac(date: Date): string {
  const zoned = toZonedTime(date, "Asia/Bangkok");
  const m = getMonth(zoned) + 1;
  const d = getDate(zoned);

  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "เมษ";
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "พฤษภ";
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "เมถุน";
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "กรกฎ";
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "สิงห์";
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "กันย์";
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "ตุลย์";
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "พิจิก";
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "ธนู";
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "มังกร";
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "กุมภ์";
  return "มีน";
}

export function monthYearTHNowBangkok(): string {
  return formatInTimeZone(new Date(), "Asia/Bangkok", "MMMM yyyy", {
    locale: th,
  });
}

export function formatDateTH(date: Date): string {
  return formatInTimeZone(date, "Asia/Bangkok", "dd MMMM yyyy", {
    locale: th,
  });
}

export function monthKey(
  d: Date | string | number = new Date(),
  tz = "Asia/Bangkok",
  offsetMonths = 0
): string {
  const base = d instanceof Date ? d : new Date(d);
  const zonedBase = toZonedTime(base, tz);
  const adjusted = addMonths(zonedBase, offsetMonths);
  return formatInTimeZone(adjusted, tz, "yyyy-MM");
}

// เพิ่ม: คืนค่า { years, months } จาก dob (อิง timezone ที่ส่งเข้าไป)
export function ageYearsMonths(
  dob: Date,
  refDate: Date = new Date(),
  tz = "Asia/Bangkok"
): string {
  const start = toZonedTime(dob, tz);
  const end = toZonedTime(refDate, tz);

  if (end.getTime() < start.getTime()) return "0 ปี 0 เดือน";

  const dur = intervalToDuration({ start, end });
  return `${dur.years ?? 0} ปี ${dur.months ?? 0} เดือน`;
}
