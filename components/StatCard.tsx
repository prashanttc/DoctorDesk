import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface StatProps {
    count:number
    type: 'appointment' |'pending'|'cancelled'
    label:string
    logo:string
}
const StatCard = ({count, type,label,logo}:StatProps) => {
  return (
    <div className= {clsx('stat-card',{
        'bg-appointments':type  === 'appointment',
        'bg-pending':type  === 'pending',
        'bg-cancelled':type  === 'cancelled',
    })}>
    <div className='flex items-center gap-4'>
<Image height={32} width={32} alt={label} src={logo} className='size-8 w-fit'/>
<h2 className='text-32-bold text-white'>{count}</h2>
    </div>
    <p className='text-14-regular'>{label}</p>
    </div>
  )
}

export default StatCard
