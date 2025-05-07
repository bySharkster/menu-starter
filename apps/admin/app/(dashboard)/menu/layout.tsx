import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://menu-starter-admin.vercel.app/"),
  title: "Menu | Menu Starter",
  openGraph: {
    title: "Menu | Menu Starter",
    description: "Menu Starter",
    type: "website",
    url: "https://menu-starter-admin.vercel.app/menu",
    siteName: "Menu Starter",
    images: [
      {
        url: "https://menu-starter-admin.vercel.app/api/og?title=Menu Starter&description=Menu Starter",
        width: 1200,
        height: 630,
        alt: "Menu Starter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu | Menu Starter",
    description: "Menu Starter",
    images: [
      {
        url: "https://menu-starter-admin.vercel.app/api/og?title=Menu Starter&description=Menu Starter",
        width: 1200,
        height: 630,
        alt: "Menu Starter",
      },
    ],
  },
};

export default function MenuLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <div>
      {modal && <div>{modal}</div>}
      <div>{children}</div>
    </div>
  );
}
