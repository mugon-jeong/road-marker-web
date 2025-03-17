"use client";

import { PushNotificationManager } from "./_components/push-notification-manager";
import { InstallPrompt } from "./_components/install-prompt";

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
