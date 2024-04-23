"use client";
import { BaseClientProps } from "@/models/components/type";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function NoPermissionClient({ locale }: BaseClientProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col p-4 w-full mt-10 items-center justify-center align-middle">
      <span className="text-[26px]">{locale.title}</span>
      <Button
        variant={"link"}
        onClick={() => {
          router.back();
        }}
      >
        {locale.back}
      </Button>
    </div>
  );
}
