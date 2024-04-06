import { auth } from "@/auth";
import { AuthorTableClient } from "@/components/author/author-table-client";
import { NewAuthorForm } from "@/components/forms/authors/new-author-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getAuthorsWithPublisher } from "@/data/author";
import { getTranslations } from "next-intl/server";

export default async function AuthorsPage() {
  // backend hívás a tábla soradataihoz.
  const authors = await getAuthorsWithPublisher();

  // felhasználó kezelés
  const session = await auth();
  const user = session !== null ? session.user : undefined;

  //lokalizációk
  const genericT = await getTranslations("Generic");
  const authorT = await getTranslations("Author");
  const publisherT = await getTranslations("Publisher");
  const bookT = await getTranslations("Book");

  return (
    <div className="mx-10 my-5">
      <span className="text-4xl">{authorT("page_title")}</span>

      {user?.role === "ADMIN" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute right-10" size={"lg"}>
              {genericT("add")}
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 w-auto bg-transparent border-none">
            <NewAuthorForm
              locale={{
                invalid_fields: genericT("error.invalid_fields"),
                something_went_wrong: genericT("error.something_went_wrong"),
                success: genericT("success.add_success"),
                publisher_placeholder: publisherT("placeholder"),
                publisher_author: authorT("publisher"),
                new_author: authorT("new_author"),
                author_first_name: authorT("first_name"),
                author_last_name: authorT("last_name"),
                author_dob: genericT("dob"),
                author_country: authorT("author_country"),
                gender: genericT("gender"),
                gender_placeholder: genericT("gender_placeholder"),
                book_favorite_placeholder: bookT("favorite_placeholder"),
                author_favorite_book: authorT("favorite_book"),
                insert_author: authorT("insert_author"),
                favorite_book_category: authorT("favorite_book_category"),
                favorite_type_placeholder: bookT("favorite_type_placeholder"),
                country_placeholder: genericT("country_placeholder"),
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      {authors !== null && (
        <div className="mt-6">
          <AuthorTableClient
            authors={authors}
            locale={{
              author_first_name: authorT("first_name"),
              author_last_name: authorT("last_name"),
              author_country: authorT("author_country"),
              gender: genericT("gender"),
              dob: genericT("dob"),
              favorite_book_category: bookT("favorite_type"),
              publisher_name: publisherT("text"),
            }}
          />
        </div>
      )}
    </div>
  );
}
