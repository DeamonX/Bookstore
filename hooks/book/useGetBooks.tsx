import { toast } from "@/components/ui/use-toast";
import { getBooksTable } from "@/data/books";
import { Book } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

export default function useGetBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const bookResponse = await getBooksTable();
    if (bookResponse === null) {
      toast({
        variant: "destructive",
        description: "HIBA!",
      });
    } else {
      setBooks(bookResponse);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return useMemo(() => ({ books }), [books]);
}
