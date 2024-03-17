import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookstore",
};

type LocaleLayoutModel = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

export default function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutModel) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
          <h1>Header</h1>
          <div className="flex-grow mt-20">{children}</div>
        </div>
      </body>
    </html>
  );
}
