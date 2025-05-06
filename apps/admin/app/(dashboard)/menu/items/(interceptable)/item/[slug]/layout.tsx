import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { findItem } from "@/app/actions/menuItems"; // Adjust import as needed

// 1. Dynamic Metadata for Advanced SEO & OG
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await findItem(undefined, slug);
  if (!item) return notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://menu-starter-admin.vercel.app/";
  const ogImageUrl = `${siteUrl}/menu/items/item/${item.slug}/opengraph-image`;

  return {
    title: `${item.name} | Menu Item`,
    description: item.description || "Discover our menu items.",
    openGraph: {
      title: item.name,
      description: item.description || "Discover our menu items.",
      url: `${siteUrl}/menu/items/item/${item.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: item.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: item.name,
      description: item.description || "Discover our menu items.",
      images: [ogImageUrl],
    },
  };
}

// 2. Layout Component
export default async function ItemLayout({
  children,
}: {
  children: ReactNode;
}) {
  // You can fetch item data here if you want to show it in the layout
  // const item = await getMenuItemBySlug(params.slug);

  return <div>{children}</div>;
}
