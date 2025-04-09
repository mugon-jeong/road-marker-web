import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  const { data } = await supabase
    .from("travels")
    .select("*")
    .eq("user_id", user.id);
  if (data && data.length > 0) {
    redirect(`/travels/${data[0].id}`);
  }
  return redirect("/travels/new");
}
