import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adora.lk Admin",
  description: "Admin dashboard for Adora.lk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}