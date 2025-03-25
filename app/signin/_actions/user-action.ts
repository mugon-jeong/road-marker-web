"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";

const signInWith = (provider: Provider) => async () => {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  console.log(data);

  if (error) {
    console.log(error);
  }

  redirect(data.url as string);
};

const signInWithGoogle = signInWith("google");

export { signInWithGoogle };
