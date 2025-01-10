"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomInput from "../CustomInput";
import SubmitButton from "../SubmitButton";
import { useState } from "react";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const PatientForm = () => {
    const[isLoading, setIsLoading]= useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)  
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">hey there!</h1>
          <p className="text-dark-700">Schedule your first Appointment</p>
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
<SubmitButton isloading={isLoading}>Get started </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
