import { signIn, signOut } from "@/auth";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";

export async function SignOutButton() {
  const authT = await getTranslations("Auth");
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button className="text-primary-foreground" variant={"link"}>
        {authT("logout")}
      </Button>
    </form>
  );
}
