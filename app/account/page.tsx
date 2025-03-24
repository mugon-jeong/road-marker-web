import AccountForm from "@/components/form/account-form";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  return (
    <div>
      <AccountForm user={user} />
    </div>
  );
};

export default page;
