/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {E164Number} from 'libphonenumber-js/core';

interface customProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconAlt?: string,
    icon?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: string,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: customProps }) => {
    const { fieldType, icon, iconAlt, placeholder } = props

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {icon && (
                        <Image src={icon} alt={iconAlt || 'icon'} height={24} width={24} className='ml-2' />
                    )}
                    <FormControl>
                        <Input placeholder={placeholder} {...field} className='shad-input border-0' />
                    </FormControl>
                </div>

            )

        case FormFieldType.PHONE_INPUT:
            return (
                <PhoneInput
                    className='input-phone '
                    placeholder={placeholder}
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    international
                    withCountryCallingCode
                    defaultCountry='IN' />
            )
        default:
            break;
    }
}

const CustomInput = (props: customProps) => {
    const { control, fieldType, name, label } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomInput
