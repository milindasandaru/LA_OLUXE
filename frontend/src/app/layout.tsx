import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adora.lk",
  description: "Premier e-commerce destination",
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