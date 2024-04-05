import { toast } from "@/components/ui/use-toast";
import { getAuthors } from "@/data/author";
import { Author } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

export default function useGetAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);

  const fetchAuthors = async () => {
    const authorResponse = await getAuthors();
    if (authorResponse === null) {
      toast({
        variant: "destructive",
        description: "HIBA!",
      });
    } else {
      setAuthors(authorResponse);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return useMemo(() => ({ authors }), [authors]);
}
