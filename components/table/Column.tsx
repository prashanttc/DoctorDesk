"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { Appointment } from "@/types/actions"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constant"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"

export const columns: ColumnDef<Appointment>[] = [
    {
        header: 'ID',
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
    },
    {
        accessorKey: "patient",
        header: 'Patient',
        cell: ({ row }) => {
            return <p className="text-14-medium">{row.original.patient.name}</p>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return <div className="min-w-[115px]">
                <StatusBadge status={row.original.status} />
            </div>
        }
    },
    {
        accessorKey: "schedule",
        header: "Appointment",
        cell: ({ row }) => {
            return <p className="text-14-regular min-w-[100px]">
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        }
    },
    {
        accessorKey: "primaryPhysician",
        header:()=> "Doctor",
        cell: ({ row }) => {
            const doctor = Doctors.find((doc)=> doc.name === row.original.primaryPhysician)
            return <div className="flex  items-center gap-3">
              <Image src={doctor?.image!} height={100} width={100} alt="doctor" className="size-8"/>
                </div>
        }
    },
    {
        id: "actions",
        header:()=> <div className="pl-4">Actions</div>,
        cell: ({ row }) => {
            return (
         <div className="flex gap-1">
            <AppointmentModal/>
         </div>
            )
        },
    },
]
