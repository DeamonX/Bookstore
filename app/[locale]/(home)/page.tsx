import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const homeT = await getTranslations("Home");
  const session = await auth();
  return (
    <div className="pt-10 w-full px-20">
      <span className="flex justify-center text-4xl">
        {homeT("welcome")}{" "}
        {session?.user.name ? session.user.name : homeT("visitor")}!
      </span>
      <span className="flex pt-12 text-xl">{homeT("text1")}</span>
      <span className="flex pt-2 text-xl">{homeT("text2")}</span>
      <span className="flex pt-2 text-xl">{homeT("text3")}</span>
    </div>
  );
}
