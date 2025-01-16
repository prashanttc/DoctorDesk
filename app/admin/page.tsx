import StatCard from '@/components/StatCard'
import { columns } from '@/components/table/Column'
import {DataTable} from '@/components/table/DataTable'
import { recentAppointments } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = async() => {
    const getAppointmentData = await recentAppointments()
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
<Link href='/' >
<Image height={32} width={162} alt='logo' src='/assets/icons/logo-full.svg' className='w-fit h-8' />
</Link>
<p className='text-16-semibold'>Admin dashboard</p>
        </header>
    <main className='admin-main'>
        <section className='w-full space-y-4'>
            <h1 className='header'>Welcome!</h1>
            <p className='text-dark-700'>manage all your appointment here</p>
        </section>
        <section className='admin-stat'>
<StatCard type='appointment' count={getAppointmentData.scheduledCount} label='scheduled appointments' logo="/assets/icons/appointments.svg"/>
<StatCard type='pending' count={getAppointmentData.pendingCount} label='pendings appointments' logo="/assets/icons/pending.svg"/>
<StatCard type='cancelled' count={getAppointmentData.cancelledCount} label='cancelled appointments' logo="/assets/icons/cancelled.svg"/>
        </section>
        <DataTable columns={columns} data={getAppointmentData.document}/>
    </main>
    </div>

  )
}

export default Admin
