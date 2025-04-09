"use client";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { use, useState } from "react";
import { format, isSameDay } from "date-fns";
import { DayMouseEventHandler } from "react-day-picker";
import { Separator } from "@/components/ui/separator";
import { Itineraries } from "@/app/(main)/travels/[id]/_actions/itinerary-actions";
import { AddItineraryDialog } from "./add-itinerary-dialog";

export function DatePicker({
  current,
  itineraries,
}: {
  current: string;
  itineraries: Promise<Itineraries>;
}) {
  const values = use(itineraries);
  const dates = values?.map((itinerary) => new Date(itinerary.date)) || [];
  const [value, setValue] = useState<Date[]>(dates);
  const handleDayClick: DayMouseEventHandler = (day, modifiers) => {
    const newValue = [...value];
    if (modifiers.selected) {
      const index = value.findIndex((d) => isSameDay(day, d));
      newValue.splice(index, 1);
    } else {
      newValue.push(day);
    }
    setValue(newValue);
  };
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          captionLayout={"buttons"}
          onDayClick={handleDayClick}
          modifiers={{ selected: value }}
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          disabled={{ before: new Date() }}
          components={{
            CaptionLabel: ({ id, displayMonth }) => {
              return (
                <div key={id} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {format(displayMonth, "MMMM yyyy")}
                  </span>
                  <Separator orientation="vertical" />
                  <AddItineraryDialog travelId={current} />
                </div>
              );
            },
          }}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
