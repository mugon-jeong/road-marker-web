import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { LocationProvider } from "@/providers/location-provider";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <LocationProvider>{children}</LocationProvider>
    </SidebarProvider>
  );
};

export default layout;
