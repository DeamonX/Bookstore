import NoPermissionClient from "@/components/no-permission/no-permission-client";
import { getTranslations } from "next-intl/server";

export default async function NoPermissionPage() {
  const noPermissionT = await getTranslations("noPermission");
  return (
    <NoPermissionClient
      locale={{
        title: noPermissionT("title"),
        back: noPermissionT("back"),
      }}
    />
  );
}
