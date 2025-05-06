import React from "react";
import { notFound } from "next/navigation";
import { findItem } from "@/app/actions/menuItems";
import { getCategories } from "@/app/actions/menuCategories";
import GoBack from "@/components/atoms/GoBack";
import { EditMenuItem } from "@/components/molecules/forms/EditMenuItem";
import { menuItemsPath } from "@/lib/paths";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const item = await findItem(undefined, slug);
  if (!item) return notFound();

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

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [menuItem, categories] = await Promise.all([
    findItem(undefined, slug),
    getCategories(),
  ]);

  if (!menuItem || !categories) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-row justify-start items-center gap-4 mb-4">
        <GoBack link={menuItemsPath} />
        <h1 className="text-3xl font-semibold text-center ">Edit Menu Item</h1>
      </div>

      <EditMenuItem menuItem={menuItem} categories={categories} />
    </div>
  );
}
