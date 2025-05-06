import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authOptions";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default async function RequireAuth({ children }: RequireAuthProps) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.email || !user) {
    redirect("/signin");
  }

  // if (!user.isAdmin) {
  //   redirect("https://digital-sunsets.com/contact");
  // }

  return <>{children}</>;
}
