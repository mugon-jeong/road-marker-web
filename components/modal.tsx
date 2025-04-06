"use client";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Dialog } from "./ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleOpenChange = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>{children}</DialogOverlay>
    </Dialog>
  );
}
