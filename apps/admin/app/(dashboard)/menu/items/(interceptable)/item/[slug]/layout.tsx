import { findItem } from "@/app/actions/menuItems";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ItemProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ItemProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findItem(undefined, slug);
  if (!item) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://menu-starter-admin.vercel.app/";
  const ogImageUrl = `${siteUrl}/api/og?title=${item.name}&description=${item.description}`;

  return {
    title: `${item.name} | Menu Item`,
    description: item.description || "Discover our menu items.",
    openGraph: {
      title: item.name,
      description: item.description || "Discover our menu items.",
      type: "article",
      url: `${siteUrl}/menu/items/item/${item.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: item.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: item.name,
      description: item.description || "Discover our menu items.",
      images: [ogImageUrl],
    },
  };
}

export default function ItemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
