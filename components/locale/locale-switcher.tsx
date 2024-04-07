"use client";
import { locales } from "@/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BaseClientProps } from "@/models/components/type";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LocaleSwitcher({ locale }: BaseClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function onSelectChange(locale: string) {
    router.replace(`/${locale}${pathname.substring(3)}`);
  }

  return (
    <Select defaultValue={currentLocale} onValueChange={onSelectChange}>
      <SelectTrigger className="w-fit mr-4">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {cur === "hu" ? locale.hu : locale.en}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
