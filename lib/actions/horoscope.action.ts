"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import {
  ageYearsMonths,
  formatDateTH,
  getThaiZodiac,
  monthKey,
  monthYearTHNowBangkok,
} from "../zodiac";
import { generateHoroscope } from "../openai";

export async function createHoroscope(dob: Date) {
  const session = await auth();

  if (!session?.user.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const monthKeyValue = monthKey(new Date());

    const checkHoroscope = await prisma.horoscope.findUnique({
      where: {
        user_month_key_unique: {
          userId: session.user.id,
          monthKey: monthKeyValue,
        },
      },
      select: {
        id: true,
      },
    });

    if (checkHoroscope?.id) {
      return {
        success: false,
        message: "Horoscope already exists for this month",
      };
    }

    const birthday = formatDateTH(dob);
    const zodiacThai = getThaiZodiac(dob);
    const monthYearTH = monthYearTHNowBangkok();
    const age = ageYearsMonths(dob);

    const horoscopeResult = await generateHoroscope({
      birthday,
      zodiacThai,
      monthYearTH,
    });

    const newHoroscope = await prisma.horoscope.create({
      data: {
        userId: session.user.id,
        monthKey: monthKeyValue,
        dob: birthday,
        age: age,
        zodiac: zodiacThai,
        monthYear: monthYearTH,
        love: horoscopeResult.love,
        career: horoscopeResult.career,
        finance: horoscopeResult.finance,
        luckyColorNameTH: horoscopeResult.luckyColor.nameTH,
        luckyColorHex: horoscopeResult.luckyColor.hex,
        luckyNumber: horoscopeResult.luckyNumber,
      },
    });

    return {
      success: true,
      data: newHoroscope,
    };
  } catch (error) {
    console.error("Error creating horoscope:", error);
    return {
      success: false,
      message: "Failed to create horoscope",
    };
  }
}
