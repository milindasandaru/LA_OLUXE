import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import "remixicon/fonts/remixicon.css";

export const metadata: Metadata = {
  title: "Adora.lk",
  description: "Premier e-commerce destination",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased ${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}