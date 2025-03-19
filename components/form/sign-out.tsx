import { signOut } from "@/auth";
import React from "react";

const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button>Sign out</button>
    </form>
  );
};

export default SignOut;
