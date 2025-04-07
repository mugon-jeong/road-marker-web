"use server";

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export type Travels = {
  created_at: string;
  deleted_at: string | null;
  id: string;
  title: string;
  updated_at: string | null;
  user_id: string;
}[] | null

export async function getTravels() {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  return supabase.from("travels").select("*").eq("user_id", user.id);
}
