import NextAuthSessionProvider from "@/lib/NextAuthSessionProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// console.log()
// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "500", "700", "900"],
// });

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Ketada User Dashboard",
  description: "Immigration platform user dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} ${dmSans.className} antialiased`}>
        <Toaster position="top-center" richColors />
        <NextAuthSessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
