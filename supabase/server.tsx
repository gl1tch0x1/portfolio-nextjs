"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //  Await the cookies function before using it
  const cookieStore = await cookies(); 

  //  Create Supabase client correctly
  const supabase = createServerComponentClient({ cookies });

  //  Get session correctly
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //  Redirect if no session exists
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
