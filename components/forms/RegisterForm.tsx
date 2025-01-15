"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import CustomInput from "../CustomInput";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constant";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patient.actions";

const formSchema = PatientFormValidation;

const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        let formData;
        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobfile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type,
            })
            formData = new FormData();
            formData.append('blobfile', blobfile);
            formData.append('fileName', values.identificationDocument[0].name)
        }
        try {
            const patientData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            const patient = await registerPatient(patientData);
            if(patient) router.push(`/patients/${user.$id}/new-appointment`)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
        finally{
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
                <div className="flex flex-col xl:flex-row gap-6">
                    <CustomInput
                        name="insuranceProvider"
                        placeholder="LIC"
                        label="insurance provider"
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                    />
                    <CustomInput
                        name="insurancePolicyNumber"
                        placeholder="ABC3483482323"
                        label="Insurance policy number"
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                    />
                </div>
                <div className="flex flex-col xl:flex-row gap-6">
                    <CustomInput
                        name="allergies"
                        placeholder="peanut , cashew"
                        label="Allergies"
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                    />
                    <CustomInput
                        name="currentMedication"
                        placeholder="Paracetamol 500g"
                        label="current medication"
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                    />
                </div>
                <div className="flex flex-col xl:flex-row gap-6">
                    <CustomInput
                        name="familyMedicalHistory"
                        placeholder="alziemer"
                        label="Family medical history"
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                    />
                    <CustomInput
                        name="pastMedicalHistory"
                        placeholder="hyperhydrosis"
                        label="past medical history"
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification and verification</h2>
                    </div>
                </section>
                <CustomInput
                    name="identificationType"
                    placeholder="select your identification type"
                    label="identification type"
                    control={form.control}
                    fieldType={FormFieldType.SELECT}
                >  {IdentificationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                        {type}
                    </SelectItem>
                ))}
                </CustomInput>
                <CustomInput
                    name="identificationNumber"
                    placeholder="12345678876"
                    label="identification number"
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                />
                <CustomInput
                    name="identificationDocument"
                    label="identification Document"
                    control={form.control}
                    fieldType={FormFieldType.SKELETON}
                    renderSkeleton={(field) => (
                        <FileUploader files={field.value} onChange={field.onChange} />
                    )}
                />

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>
                </section>
                <CustomInput
                    name="disclosureConsent"
                    label="I consent to diclosure of information"
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                />
                <CustomInput
                    name="privacyConsent"
                    label="I consent to privacy policy"
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                />
                <CustomInput
                    name="treatmentConsent"
                    label="I consent to treatment"
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                />

                <SubmitButton isloading={isLoading}>Get started </SubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;
