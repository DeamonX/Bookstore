import { auth } from "@/auth";
import { ProfileButton } from "../profile/profile-button";
import { ModeToggle } from "../themes/theme-switcher";
import { SignInButton } from "../auth/sign-in";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Navigation() {
  const session = await auth();
  const navigationT = await getTranslations("Navigation");
  return (
    <nav className="flex w-full">
      <div className="flex justify-center gap-10 items-center grow">
        <Link href={"/"}>{navigationT("home")}</Link>
        <Link href={"/books"}>{navigationT("books")}</Link>
        <Link href={"/authors"}>{navigationT("authors")}</Link>
        <Link href={"/publishers"}>{navigationT("publishers")}</Link>
      </div>
      <div className="flex ml-auto my-2 mx-4">
        <ModeToggle />
        {session === null ? <SignInButton /> : <ProfileButton {...session} />}
      </div>
    </nav>
  );
}
