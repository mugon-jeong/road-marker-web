import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { addItinerary } from "../../_actions/itinerary-actions";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, CalendarPlus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

export function AddItineraryDialog({ travelId }: { travelId: string }) {
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date>();

  const handleAddItinerary = async () => {
    if (!date) return;
    const result = await addItinerary(travelId, date);
    if (result && result.length > 0) {
      toast("일정 추가 완료", {
        description: `${format(date, "PPP")} 일정이 추가되었습니다.`,
      });
      setOpen(false);
    } else {
      toast.error("일정 추가 실패", {
        description: "일정을 추가하는 중 오류가 발생했습니다.",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-1.5 rounded-full hover:bg-muted/50 transition-colors">
          <CalendarPlus className="h-4 w-4 text-muted-foreground cursor-pointer" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>여행 일정 추가</DialogTitle>
          <DialogDescription>여행 일정을 추가해주세요.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              여행 일정
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddItinerary}>
            여행 일정 추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
