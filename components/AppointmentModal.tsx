"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Appointment } from "@/types/actions";
import AppointmentForm from "./forms/AppointmentForm";

const AppointmentModal = ({
  type,
  userId,
  appointment,
  patientId,
}: {
  type: "schedule" | "cancel";
  userId: string;
  appointment: Appointment;
  patientId: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md shad-dialog">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
             please fill the following information to {type} appointment
          </DialogDescription>
        </DialogHeader>
            <AppointmentForm userId={userId} patientId={patientId} type={type} appointment={appointment} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
