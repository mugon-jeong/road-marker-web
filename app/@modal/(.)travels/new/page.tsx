import CreateTravelForm from "@/app/(main)/travels/new/_components/create-travel-form";
import { Modal } from "@/components/modal";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const page = () => {
  return (
    <Modal>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Travel</DialogTitle>
          <DialogDescription>
            Create a new travel plan. Fill in the details and save your travel
            plan.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <CreateTravelForm />
        </div>
      </DialogContent>
    </Modal>
  );
};

export default page;
