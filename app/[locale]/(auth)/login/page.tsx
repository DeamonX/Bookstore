import { LoginForm } from "@/components/forms/auth/login-form";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const authT = await getTranslations("Auth");
  const genericT = await getTranslations("Generic");
  return (
    <LoginForm
      locale={{
        OAuthAccountNotLinked: authT("OAuthAccountNotLinked"),
        something_went_wrong: genericT("something_went_wrong"),
        email: genericT("email"),
        password: genericT("password"),
        welcome_back: authT("welcome_back"),
        do_not_have_account: authT("do_not_have_account"),
        forgot_password: authT("forgot_password"),
        login: authT("login"),
      }}
    />
  );
}
