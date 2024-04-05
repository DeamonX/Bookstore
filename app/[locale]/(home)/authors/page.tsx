import { auth } from "@/auth";
import { AuthorTableClient } from "@/components/author/author-table-client";
import { NewAuthorForm } from "@/components/forms/authors/new-author-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getAuthors } from "@/data/author";
import { getTranslations } from "next-intl/server";

export default async function AuthorsPage() {
  // backend hívás a tábla soradataihoz.
  const authors = await getAuthors();
  console.log(authors);
  const session = await auth();

  const user = session !== null ? session.user : undefined;

  //Lokalizációk
  const genericT = await getTranslations("Generic");
  const authorT = await getTranslations("Author");

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
            <NewAuthorForm />
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
              favorite_book_category: authorT("favorite_book_category"),
            }}
          />
        </div>
      )}
    </div>
  );
}
