"use client"
import {Calendar} from "@/components/ui/calendar";
import {SidebarGroup, SidebarGroupContent} from "@/components/ui/sidebar";
import {use, useState} from "react";
import {format, isSameDay} from "date-fns";
import {DayMouseEventHandler} from "react-day-picker";
import {CalendarPlus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {addItinerary, Itineraries} from "@/app/(main)/travels/[id]/_actions/itinerary-actions";

export function DatePicker({itineraries}: { itineraries: Promise<Itineraries> }) {
  const values = use(itineraries)
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
  const handleAddItinerary = async () => {
    const result = await addItinerary("31ffc18b-a872-4b26-9187-a158ece3c172", (new Date()))
    console.log(result)
  }
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          captionLayout={"buttons"}
          onDayClick={handleDayClick}
          modifiers={{selected: value}}
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          disabled={{before: new Date()}}
          components={{
            CaptionLabel: ({id, displayMonth}) => {
              return (
                <div key={id} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {format(displayMonth, "MMMM yyyy")}
                  </span>
                  <Separator orientation="vertical"/>
                  <button className="p-1.5 rounded-full hover:bg-muted/50 transition-colors"
                          onClick={handleAddItinerary}>
                    <CalendarPlus className="h-4 w-4 text-muted-foreground cursor-pointer"/>
                  </button>
                </div>
              );
            }
          }}
        />

      </SidebarGroupContent>
    </SidebarGroup>
  );
}

