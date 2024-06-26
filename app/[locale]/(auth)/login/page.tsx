import { LoginForm } from "@/components/forms/auth/login-form";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const authT = await getTranslations("Auth");
  const genericT = await getTranslations("Generic");
  return (
    <LoginForm
      locale={{
        OAuthAccountNotLinked: authT("OAuthAccountNotLinked"),
        something_went_wrong: genericT("error.something_went_wrong"),
        email_not_exists: genericT("error.email_not_exists"),
        invalid_fields: genericT("error.invalid_fields"),
        invalid_credentials: authT("invalid_credentials"),
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
