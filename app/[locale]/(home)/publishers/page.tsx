import { auth } from "@/auth";
import { NewPublisherForm } from "@/components/forms/publishers/new-publisher-form";
import { PublisherTableClient } from "@/components/publisher/publisher-table-client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getPublishers } from "@/data/publisher";
import { getTranslations } from "next-intl/server";

export default async function PublishersPage() {
  // backend hívás a tábla soradataihoz.
  const publishers = await getPublishers();

  const session = await auth();

  const user = session !== null ? session.user : undefined;

  //Lokalizációk
  const genericT = await getTranslations("Generic");
  const publisherT = await getTranslations("Publisher");

  return (
    <div className="mx-10 my-5">
      <span className="text-4xl">{publisherT("page_title")}</span>

      {user?.role === "ADMIN" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute right-10" size={"lg"}>
              {genericT("add")}
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 w-auto bg-transparent border-none">
            <NewPublisherForm />
          </DialogContent>
        </Dialog>
      )}

      {publishers !== null && (
        <div className="mt-6">
          <PublisherTableClient
            publishers={publishers}
            locale={{
              date_of_establishment: genericT("date_of_establishment"),
              publisher_country: publisherT("publisher_country"),
              publisher_name: publisherT("publisher_name"),
            }}
          />
        </div>
      )}
    </div>
  );
}
