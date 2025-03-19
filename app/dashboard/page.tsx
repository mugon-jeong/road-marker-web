import React from "react";
import { PushNotificationManager } from "../_components/push-notification-manager";
import { InstallPrompt } from "../_components/install-prompt";
import SignOut from "@/components/form/sign-out";
import { auth } from "@/auth";

const page = async () => {
  //   const t = useTranslations("HomePage");
  const session = await auth();
  console.log("session", session);

  return (
    <div>
      <div>dashboard</div>
      <SignOut />
      {/* <h1>{t("title")}</h1> */}
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
};

export default page;
