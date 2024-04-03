import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { SignOutButton } from "../auth/sign-out";
import { Session } from "next-auth";

export function ProfileButton({ user }: Session) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>{user.name}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit text-[14px]">
        <SignOutButton />
      </PopoverContent>
    </Popover>
  );
}
