// lib/zodiac.ts
export function getThaiZodiac(date: Date): string {
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();

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
  return new Date().toLocaleDateString("th-TH", {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  });
}
