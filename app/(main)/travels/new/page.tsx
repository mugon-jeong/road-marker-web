import React from "react";
import CreateTravelForm from "./_components/create-travel-form";
import { GalleryVerticalEnd } from "lucide-react";

export default function page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Road Marker.
        <CreateTravelForm />
      </div>
    </div>
  );
}
