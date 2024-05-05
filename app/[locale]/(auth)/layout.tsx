import LocaleSwitcher from "@/components/locale/locale-switcher";
import { ModeToggle } from "@/components/themes/theme-switcher";
import { getTranslations } from "next-intl/server";
import { GiWhiteBook } from "react-icons/gi";

export default async function AuthLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const localeT = await getTranslations("LocaleSwitcher");
  const themeT = await getTranslations("ThemeSwitcher");
  return (
    <html lang={locale}>
      <body>
        <div className="flex w-full h-screen">
          <div className="w-1/2 bg-zinc-300 dark:bg-zinc-900">
            <div className="flex h-full justify-center items-center">
              <GiWhiteBook className="animate-pluse-slow" size={110} />
            </div>
          </div>
          <div className="flex absolute right-0 m-4">
            <LocaleSwitcher
              locale={{
                placeholder: localeT("label"),
                hu: localeT("hu"),
                en: localeT("en"),
              }}
            />
            <ModeToggle
              locale={{
                title: themeT("title"),
                light: themeT("light"),
                dark: themeT("dark"),
              }}
            />
          </div>
          <main className="flex w-1/2 justify-center items-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
