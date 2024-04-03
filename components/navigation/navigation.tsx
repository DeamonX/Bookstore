import { auth } from "@/auth";
import { ProfileButton } from "../profile/profile-button";
import { ModeToggle } from "../themes/theme-switcher";
import { SignInButton } from "../auth/sign-in";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="flex w-full">
      <div className="flex justify-center gap-10 items-center grow">
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
      </div>
      <div className="flex ml-auto my-2 mx-4">
        <ModeToggle />
        {session === null ? <SignInButton /> : <ProfileButton {...session} />}
      </div>
    </nav>
  );
}
