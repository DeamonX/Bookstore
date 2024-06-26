import { auth } from "@/auth";
import { BookTableClient } from "@/components/book/book-table-client";
import { NewBookForm } from "@/components/forms/books/new-book-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getBooksTable } from "@/data/books";
import { getTranslations } from "next-intl/server";

export default async function BooksPage() {
  // backend hívás a tábla soradataihoz.

  const books = await getBooksTable();

  const session = await auth();

  const user = session !== null ? session.user : undefined;

  const genericT = await getTranslations("Generic");
  const bookT = await getTranslations("Book");
  const authorT = await getTranslations("Author");
  const publisherT = await getTranslations("Publisher");

  return (
    <div className="mx-10 my-5">
      <span className="text-4xl">{bookT("page_title")}</span>
      {(user?.role === "ADMIN" || user?.role === "PUBLISHER") && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute right-10" size={"lg"}>
              {genericT("add")}
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 w-auto border-none">
            <NewBookForm
              locale={{
                invalid_fields: genericT("error.invalid_fields"),
                something_went_wrong: genericT("error.something_went_wrong"),
                success: genericT("success.add_success"),
                new_book: bookT("new_book"),
                author_placeholder: authorT("placeholder"),
                author_text: authorT("text"),
                publisher_placeholder: publisherT("placeholder"),
                publisher_text: publisherT("text"),
                book_title: genericT("title"),
                book_title_exists: bookT("error.title_exists"),
                book_type: genericT("type"),
                book_type_placeholder: bookT("type_placeholder"),
                publication_date: bookT("publication_date"),
                book_price: genericT("price"),
                insert_book: bookT("insert_book"),
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      {books !== null && (
        <div className="mt-6">
          <BookTableClient
            books={books}
            locale={{
              title: genericT("title"),
              author_first_name: authorT("first_name"),
              author_last_name: authorT("last_name"),
              publication_date: bookT("publication_date"),
              price: genericT("price"),
              type: genericT("type"),
              publisher_name: publisherT("text"),
              country: genericT("country"),
            }}
          />
        </div>
      )}
    </div>
  );
}
