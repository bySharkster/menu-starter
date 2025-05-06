import "@workspace/ui/globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/organisms/Sidebar";
import RequireAuth from "@/components/templates/Wrappers/RequireAuth";

export const metadata: Metadata = {
  metadataBase: new URL("https://admin.digital-sunsets.vercel.app"),
  title: "Dashboard | Admin Starter",
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
