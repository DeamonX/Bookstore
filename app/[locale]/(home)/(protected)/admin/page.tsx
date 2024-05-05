import AdminPageClient from "@/components/admin/admin-page-client";
import { CheckIcon } from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";

export default async function AdminPage() {

  const adminT = await getTranslations('Admin');



  return (
    <AdminPageClient locale={{title: adminT("title")}}/>
)}
