import Navigation from "@/components/navigation/navigation";

export default async function HomeLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
