import { LoginForm } from "@/components/forms/login-form";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const authT = await getTranslations("Auth");
  return <LoginForm />;
}
