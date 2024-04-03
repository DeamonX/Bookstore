import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { getTranslations } from "next-intl/server";

export async function ProfileButton() {
  const authT = await getTranslations("Auth");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>Profile</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-[14px]">
        {authT("logout")}
      </PopoverContent>
    </Popover>
  );
}
