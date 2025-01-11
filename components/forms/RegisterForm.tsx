"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import CustomInput from "../CustomInput";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions } from "@/constant";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";

const formSchema = UserFormValidation;

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const user = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            };
            const newUser = await createUser(user)
            console.log("", newUser)

            if (newUser) {
                router.push(`/patients/${newUser.$id}/register`)
            }
        } catch (error) {
            console.log("error", error)
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">welcome!</h1>
                    <p className="text-dark-700">let us know more about yourself</p>
                </section>
                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal information</h2>
                    </div>
                </section>
                <CustomInput
                    name="name"
                    icon="/assets/icons/user.svg"
                    placeholder="john doe"
                    iconAlt="user"
                    label="Full Name"
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                />
                <div className="flex flex-col xl:flex-row gap-6">
                    <CustomInput
                        name="email"
                        icon="/assets/icons/email.svg"
                        placeholder="johndoe@gmail.com"
                        iconAlt="email"
                        label="Email"
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                    />
                    <CustomInput
                        name="phone"
                        placeholder="(+91) 00000 00000"
                        label="Phone"
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                    />
                </div>
                <div className="flex flex-col xl:flex-row gap-6">
                    <CustomInput
                        name="birthDate"
                        label="Date of Birth"
                        control={form.control}
                        fieldType={FormFieldType.DATE_PICKER}
                    />
                    <CustomInput
                        name="gender"
                        label="Gender"
                        control={form.control}
                        fieldType={FormFieldType.SKELETON}
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>
                <div className="flex flex-col xl:flex-row gap-6">
                    <CustomInput
                        name="address"
                        placeholder="123 indore, india"
                        label="Address"
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                    />
                    <CustomInput
                        name="occupation"
                        placeholder="software engineer"
                        label="Occupation"
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                    />
                </div>
                <div className="flex flex-col xl:flex-row gap-6">
                    <CustomInput
                        name="emergencyContactName"
                        placeholder="Guardian's name"
                        label="Emergency contact name"
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                    />
                    <CustomInput
                        name="emergencyContactNumber"
                        placeholder="(+91) 00000 00000"
                        label="Emergency Contact Number"
                        control={form.control}
                        fieldType={FormFieldType.PHONE_INPUT}
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical information</h2>
                    </div>
                </section>
                <CustomInput
                    name="primaryPhysician"
                    placeholder="select a physician"
                    label="Primary Physician"
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


                <SubmitButton isloading={isLoading}>Get started </SubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;
