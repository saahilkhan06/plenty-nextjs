import { notFound } from "next/navigation";
import { pageRegistry } from "../pageRegistry";

export default async function AdminSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const route = slug.join("/");

  const PageComponent =
    pageRegistry[route as keyof typeof pageRegistry];

  if (!PageComponent) {
    notFound();
  }

  return <PageComponent />;
}