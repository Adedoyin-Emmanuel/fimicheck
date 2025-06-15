import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "FimiCheck - Nigerian Vehicle Plate Lookup",
  description:
    "Look up vehicle information using Nigerian plate numbers. Get vehicle make, color, and images instantly.",
  keywords: [
    "Nigeria",
    "vehicle lookup",
    "plate number",
    "car information",
    "vehicle details",
  ],
  authors: [{ name: "Adedoyin Emmanuel Adeniyi" }],
  robots: "index, follow",
  icons: {
    icon: "/fimicheck.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#f7f7f8]">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
