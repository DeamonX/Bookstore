import { BaseClientProps } from "@/models/components/type";
import { CheckIcon } from "@radix-ui/react-icons";

export default function AdminPageClient ({locale}:BaseClientProps){
    return (<div>
        <div className="flex justify-center text-3xl mt-20">
          <span>{locale.title}</span>
        </div>
        <div className="mt-20 flex justify-center rounded-3xl w-fit m-auto h-fit bg-white">
          <CheckIcon width={100} height={100} color="green"/>
        </div>
        </div>)
}