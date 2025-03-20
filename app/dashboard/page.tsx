import React from "react";
import { PushNotificationManager } from "../_components/push-notification-manager";
import { InstallPrompt } from "../_components/install-prompt";

const page = async () => {
  //   const t = useTranslations("HomePage");

  const signOut = async () => {
    await fetch("/auth/signout", {
      method: "POST",
    });
  };
  return (
    <div>
      <div>dashboard</div>
      <button onClick={signOut}>Sign out</button>
      {/* <h1>{t("title")}</h1> */}
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
};

export default page;
