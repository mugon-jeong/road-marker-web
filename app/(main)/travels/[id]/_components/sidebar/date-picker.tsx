"use client";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { use, useState } from "react";
import { format, isSameDay } from "date-fns";
import { DayMouseEventHandler } from "react-day-picker";
import { Separator } from "@/components/ui/separator";
import {
  addItinerary,
  deleteItinerary,
  Itineraries,
} from "@/app/(main)/travels/[id]/_actions/itinerary-actions";
import { AddItineraryDialog } from "./add-itinerary-dialog";
import { toast } from "sonner";

export function DatePicker({
  current,
  itineraries,
}: {
  current: string;
  itineraries: Promise<Itineraries>;
}) {
  const values = use(itineraries);
  const dates =
    values?.map((itinerary) => ({
      ...itinerary,
      date: new Date(itinerary.date),
    })) || [];
  const [value, setValue] = useState<
    {
      date: Date;
      created_at: string;
      id: string;
      travel_id: string | null;
      updated_at: string | null;
    }[]
  >(dates);
  const [open, setOpen] = useState(false);
  const handleDeleteItinerary = async (itinerary: (typeof value)[0]) => {
    const result = await deleteItinerary(itinerary.id);
    if (result) {
      toast.success("일정 삭제 완료", {
        description: `${format(itinerary.date, "PPP")} 일정이 삭제되었습니다.`,
      });
      return true;
    }
    toast.error("일정 삭제 실패", {
      description: "일정을 삭제하는 중 오류가 발생했습니다.",
    });
    return false;
  };

  const handleAddNewItinerary = async (date: Date) => {
    console.log(date);
    const result = await addItinerary(current, date);
    if (result && result.length > 0) {
      toast.success("일정 추가 완료", {
        description: `${format(date, "PPP")} 일정이 추가되었습니다.`,
      });
      return { ...result[0], date: new Date(result[0].date) };
    }
    toast.error("일정 추가 실패", {
      description: "일정을 추가하는 중 오류가 발생했습니다.",
    });
    return null;
  };

  const handleDayClick: DayMouseEventHandler = async (day, modifiers) => {
    if (modifiers.selected) {
      const targetItinerary = value.find((d) => isSameDay(d.date, day));
      if (!targetItinerary) return;

      const success = await handleDeleteItinerary(targetItinerary);
      if (success) {
        setValue(value.filter((v) => v.id !== targetItinerary.id));
      }
    } else {
      const newItinerary = await handleAddNewItinerary(day);
      if (newItinerary) {
        setValue([...value, newItinerary]);
      }
    }
  };

  const handleAddItinerary = async (date: Date) => {
    const newItinerary = await handleAddNewItinerary(date);
    if (newItinerary) {
      setValue([...value, newItinerary]);
      setOpen(false);
    }
  };
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          captionLayout={"buttons"}
          onDayClick={handleDayClick}
          modifiers={{ selected: value.map((d) => d.date) }}
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
          components={{
            CaptionLabel: ({ id, displayMonth }) => {
              return (
                <div key={id} className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {format(displayMonth, "MMMM yyyy")}
                  </span>
                  <Separator orientation="vertical" />
                  <AddItineraryDialog
                    open={open}
                    onOpenChange={setOpen}
                    onAddItineraryDialog={handleAddItinerary}
                  />
                </div>
              );
            },
          }}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
