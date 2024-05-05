import { RegisterForm } from "@/components/forms/auth/register-form";
import { getTranslations } from "next-intl/server";

export default async function RegisterPage() {
  const authT = await getTranslations("Auth");
  const genericT = await getTranslations("Generic");

  return (
    <RegisterForm
      locale={{
        create_account: authT("create_account"),
        already_have_account: authT("already_have_account"),
        name: genericT("name"),
        email: genericT("email"),
        password: genericT("password"),
        password_repeat: genericT("password_repeat"),
        error_invalid_fields: genericT("error.invalid_fields"),
        error_email_taken: authT("error.email_taken"),
      }}
    />
  );
}
