/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Button } from '@/components/ui/button'
import { Doctors } from '@/constant'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SuccessProps = {
    params: { userId: string };
    searchParams: { appointmentId?: string }; 
  };

const Success = async ({ params, searchParams }: SuccessProps) => {
    const {userId} = await params;
    const searchparameter = await searchParams
    const appointmentId = (searchparameter?.appointmentId as string) || "";
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc)=> doc.name === appointment.primaryPhysician)
    return (    
        <div className='flex h-screen max-h-screen px-[5%]'>
            <div className='success-img'>
                <Link href='/'>
                    <Image height={1000} width={1000} alt='logo' src='/assets/icons/logo-full.svg' className='h-10 w-fit' />
                </Link>
                <section className='flex flex-col items-center'>
                    <Image src='/assets/gifs/success.gif' height={300} width={280} alt='success' priority/>
                    <h1 className='header mb-6 max-w-[600px] text-center'>
                        your <span className='text-green-500'>appointment request</span> has been successfully submited.</h1>
                    <p>we will be in touch shortly</p>
                </section>
                <section className='request-details'>
                    <p>requested appointment details:</p>
                    <div className='flex items-center gap-3'>
                        <Image height={100} width={100} alt='doctor'src={doctor?.image!} className='size-6' />
                        <p className='whitespace-nowrap'>Dr.{doctor?.name}</p>
                    </div>
                    <div className='flex gap-2'>
                        <Image height={24} width={24} alt='calendar' src="/assets/icons/calendar.svg"/>
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>
                <Button variant='outline' className="shad-primary-btn">
                    <Link href={`/patients/${userId}/new-appointment`}>
                    New Appointment
                    </Link>
                </Button>

            </div>
        </div>
    )
}

export default Success
