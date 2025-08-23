import { DefaultSession } from "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      role: string;
      picture: string;
      providerAccountId: string;
      provider: string;
      dob: Date;
    } & DefaultSession["user"];
  }
}

declare module "nodemailer";
