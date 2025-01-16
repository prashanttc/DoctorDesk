"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomInput from "../CustomInput";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Doctors } from "@/constant";
import { createAppointment } from "@/lib/actions/appointment.actions";

const AppointmentForm = ({ userId, patientId, type }: { userId: string; patientId: string; type: "create" | "schedule" | "cancel" }) => {
    const formSchema = getAppointmentSchema(type);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            note: "",

        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        let status;
        switch (type) {
            case 'schedule':
                status = 'scheduled'
                break;
            case 'cancel':
                status = 'cancelled'
                break;
            default:
                status = 'pending'
                break;
        }
        try {
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason || "",
                    note: values.note || "",
                    status: status as Status
                }
                const appointment = await createAppointment(appointmentData)
                if (appointment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
                }
            }
        } catch (error) {
            console.log("unable to create appointment", error)
            setIsLoading(false)
        }
    }
    let buttonLabel;
    switch (type) {
        case 'cancel':
            buttonLabel = 'cancel appointment'
            break;
        case 'schedule':
            buttonLabel = 'schedule appointment'
            break;
        default:
            buttonLabel='Submit Appointment'
            break;
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className="header">New appointment!</h1>
                    <p className="text-dark-700">request a new Appointment in 10 seconds</p>
                </section>
                {type !== "cancel" &&
                    <>
                        <CustomInput
                            name="primaryPhysician"
                            placeholder="select a doctor"
                            label="select your doctor"
                            control={form.control}
                            fieldType={FormFieldType.SELECT}
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image src={doctor.image} height={32} width={32} alt={doctor.name} className='rounded-full border border-dark-500' />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomInput>
                        <CustomInput
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            label="expected date"
                            name="schedule"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy -h:mm aa"
                        />
                        <div className="flex flex-col xl:flex-row gap-6">
                            <CustomInput
                                name="reason"
                                placeholder="enter reason for appointment"
                                label="reason for appointment"
                                control={form.control}
                                fieldType={FormFieldType.TEXTAREA}
                            />
                            <CustomInput
                                name="notes"
                                placeholder="any notes"
                                label="Notes"
                                control={form.control}
                                fieldType={FormFieldType.TEXTAREA}
                            />
                        </div>
                    </>}
                {type == "cancel" && <>
                    <CustomInput
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="reason for cancellation"
                        placeholder="enter reason for cancellation" />
                </>}
                <SubmitButton isloading={isLoading} className={`${type === 'cancel' ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>{buttonLabel} </SubmitButton>
            </form>
        </Form>
    );
};

export default AppointmentForm;
