export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

// const locales = ["en", "hu"];

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }
