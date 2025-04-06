"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getTravels() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  return await supabase.from("travels").select("*").eq("user_id", user.id);
}
