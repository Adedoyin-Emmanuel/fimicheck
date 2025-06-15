import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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
  authors: [{ name: "FimiCheck" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#f7f7f8]">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
