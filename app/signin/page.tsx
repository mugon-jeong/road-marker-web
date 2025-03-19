import { auth } from "@/auth";
import SignIn from "@/components/form/sign-in";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");
  return <SignIn />;
};

export default page;
