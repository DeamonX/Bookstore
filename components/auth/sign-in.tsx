import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";

export async function SignInButton() {
  const authT = await getTranslations("Auth");
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button variant={"ghost"}>{authT("login")}</Button>
    </form>
  );
}
