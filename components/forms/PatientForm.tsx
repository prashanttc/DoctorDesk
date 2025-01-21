"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomInput from "../CustomInput";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser, loginUser } from "@/lib/actions/patient.actions";
import Link from "next/link";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}
type Props = {
  type: "sign-in" | "sign-up"
}


const PatientForm = ({ type }: Props) => {
  const formSchema = UserFormValidation(type);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        name: values.name!,
        email: values.email,
        phone: values.phone!,
      };
      let newUser;
      let oldUser;
      if (type === "sign-up") {
        newUser = await createUser(user)
        if (newUser) {
          router.push(`/patients/${newUser.$id}/register`)
        } else {
          setIsLoading(false)
          setErrorMessage("user already exist. please login")
        }
      } else {
        oldUser = await loginUser(values.email)
        if (oldUser) {
          router.push(`/patients/${oldUser.userId}/new-appointment`)
        } else {
          setIsLoading(false)
          setErrorMessage("user does not exist. please create a account")
        }
      };
    } catch (error) {
      console.log("error", error)
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">hey there!</h1>
          <p className="text-dark-700">{type === "sign-in" ? "login to schedule your appointment" : "register to schedule your first appointment"}</p>
        </section>
        <CustomInput
          name="email"
          icon="/assets/icons/email.svg"
          placeholder="johndoe@gmail.com"
          iconAlt="email"
          label="Email"
          control={form.control}
          fieldType={FormFieldType.INPUT}
        />
        {type === "sign-up" && <>
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
            name="phone"
            placeholder="(+91) 00000 00000"
            label="Phone"
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
          />
        </>}
        <SubmitButton isloading={isLoading}>Get started </SubmitButton>
        {errorMessage && <p className="error-message">{errorMessage}</p>
        }        <p className="text-slate-500 text-center ">{type === "sign-in" ? "not have a account yet?" : "already have a account?"} <Link href={type === "sign-in" ? "/" : "/login"} className="ml-2 cursor-pointer text-green-500">{type === "sign-in" ? "Register" : "sign in"}</Link></p>
      </form>
    </Form>
  );
};

export default PatientForm;
