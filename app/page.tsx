import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const session = await supabase.auth.getUser();
  if (!session) {
    redirect("/signin");
  }
  return redirect("/travels/1234");
}
