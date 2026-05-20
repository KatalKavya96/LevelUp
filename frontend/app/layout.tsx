import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Push-Up Muscle Builder",
  description:
    "A database-backed push-up exercise guide for muscle-focused bodyweight training."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
