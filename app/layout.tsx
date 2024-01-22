import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Search",
  description: "a simple themoviedb list with infinite loop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
