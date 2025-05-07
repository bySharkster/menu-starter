import "@workspace/ui/globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/organisms/Sidebar";
import RequireAuth from "@/components/templates/Wrappers/RequireAuth";

export const metadata: Metadata = {
  metadataBase: new URL("https://menu-starter-admin.vercel.app/"),
  title: "Dashboard | Menu Starter",
  openGraph: {
    title: "Dashboard | Menu Starter",
    description: "Menu Starter",
    type: "website",
    url: "https://menu-starter-admin.vercel.app/",
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
    title: "Dashboard | Menu Starter",
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

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 p-6 flex flex-col gap-6">
          <div className="z-10">{children}</div>
        </main>
      </div>
    </RequireAuth>
  );
}
