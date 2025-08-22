import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION || "Horoscope App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "dark")}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
