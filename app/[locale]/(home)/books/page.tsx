import { BookTableClient } from "@/components/home/book-table-client";
import { getTranslations } from "next-intl/server";

export default async function BooksPage() {
  // backend hívás a tábla soradataihoz.
  const genericT = await getTranslations("Generic");
  const bookT = await getTranslations("Book");
  const publisherT = await getTranslations("Publisher");

  return (
    <div>
      <BookTableClient
        locale={{
          title: genericT("title"),
          publication_date: bookT("publication_date"),
          price: genericT("price"),
          condition: genericT("condition"),
          publisher_name: publisherT("publisher_name"),
          country: genericT("country"),
        }}
      />
    </div>
  );
}
