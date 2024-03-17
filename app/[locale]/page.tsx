import { MongoClient, ServerApiVersion } from "mongodb";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const translation = await getTranslations("Index");
  return <>Locale Page</>;
}
