import GoogleMap from "./_components/google-map";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/sidebar/app-sidebar";
import { getTravels } from "@/app/(main)/travels/[id]/_actions/travel-actions";
import { getItineraries } from "@/app/(main)/travels/[id]/_actions/itinerary-actions";
export default async function page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const travels = getTravels().then((res) => res.data);
  const itineraries = getItineraries(id);
  return (
    <>
      <AppSidebar current={id} travels={travels} itineraries={itineraries} />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="h-full">
          <div className="h-full relative p-4">
            <GoogleMap />
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
