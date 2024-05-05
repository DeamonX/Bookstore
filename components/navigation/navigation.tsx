import { auth } from "@/auth";
import { ProfileButton } from "../profile/profile-button";
import { ModeToggle } from "../themes/theme-switcher";
import { SignInButton } from "../auth/sign-in";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import LocaleSwitcher from "../locale/locale-switcher";

export default async function Navigation() {
  const session = await auth();
  const navigationT = await getTranslations("Navigation");
  const localeT = await getTranslations("LocaleSwitcher");
  return (
    <nav className="flex w-full">
      <div className="flex justify-center gap-10 items-center grow">
        <Link href={"/"}>{navigationT("home")}</Link>
        <Link href={"/books"}>{navigationT("books")}</Link>
        <Link href={"/authors"}>{navigationT("authors")}</Link>
        <Link href={"/publishers"}>{navigationT("publishers")}</Link>
        {session?.user.role === "ADMIN" ? 
        <Link href={"/admin"}>{navigationT("admin")}</Link> : <></>}
      </div>
      <div className="flex ml-auto my-2 mx-4">
        <LocaleSwitcher
          locale={{
            placeholder: localeT("label"),
            hu: localeT("hu"),
            en: localeT("en"),
          }}
        />
        <ModeToggle />
        {session === null ? <SignInButton /> : <ProfileButton {...session} />}
      </div>
    </nav>
  );
}
