/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface customProps {
    control: Control<any>;
    fieldType: FormFieldType;
    name: string;
    label?: string;
    placeholder?: string;
    iconAlt?: string;
    icon?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: customProps }) => {
    const { fieldType, icon, iconAlt, placeholder, dateFormat, showTimeSelect, renderSkeleton } =
        props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {icon && (
                        <Image
                            src={icon}
                            alt={iconAlt || "icon"}
                            height={24}
                            width={24}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.PHONE_INPUT:
            return (
                <PhoneInput
                    className="input-phone "
                    placeholder={placeholder}
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    international
                    withCountryCallingCode
                    defaultCountry="IN"
                />
            );
        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md bg-dark-400 border-dark-500">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="calendar"
                        className="ml-2"
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormat ?? "MM/dd/yyyy"}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel="time:"
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>)
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea placeholder={placeholder} {...field} className="shad-textArea" disabled={props.disabled} />

                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor={props.name} className="checkbox-label">
                            {props.label}
                        </Label>
                    </div>
                </FormControl>
            )
        default:
            break;
    }
};

const CustomInput = (props: customProps) => {
    const { control, fieldType, name, label } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    );
};

export default CustomInput;
