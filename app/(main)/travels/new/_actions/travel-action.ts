"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const createTravel = async ({ title }: { title: string }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  console.log("user", user);
  return await supabase
    .from("travels")
    .insert({ title, user_id: user.id })
    .select("*")
    .single();
};
