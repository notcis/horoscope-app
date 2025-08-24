"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";

export const updateUser = async ({
  dob,
  name,
}: {
  dob: Date;
  name: string;
}) => {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const updateUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name,
        dob: dob,
      },
    });
    return {
      success: true,
      data: updateUser,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update user",
    };
  }
};
