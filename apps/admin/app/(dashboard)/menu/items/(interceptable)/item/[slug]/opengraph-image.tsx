import { ImageResponse } from "next/og";
import { findItem } from "@/app/actions/menuItems";
import { notFound } from "next/navigation";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await findItem(undefined, slug);

  if (!item) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.name}
      </div>
    ),
    {
      ...size,
    }
  );
}
