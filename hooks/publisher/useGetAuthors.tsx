import { toast } from "@/components/ui/use-toast";
import { getPublishers } from "@/data/publisher";
import { Publisher } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

export default function useGetPublishers() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const fetchAuthors = async () => {
    const publisherResponse = await getPublishers();
    if (publisherResponse === null) {
      toast({
        variant: "destructive",
        description: "HIBA!",
      });
    } else {
      setPublishers(publisherResponse);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return useMemo(() => ({ publishers }), [publishers]);
}
