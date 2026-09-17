import { notFound } from "next/navigation";
import { pageRegistry } from "../pageRegistry";

export default async function AdminSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const PageComponent =
    pageRegistry[slug as keyof typeof pageRegistry];

  if (!PageComponent) {
    notFound();
  }

  return <PageComponent />;
}