import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const register = async({params: {userId}}:SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen remove-scrollbar">
      <section className="container remove-scrollbar my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src='/assets/icons/logo-full.svg' height={1000} width={1000} alt="logo" className="mb-10 h-12 w-fit" />
          <RegisterForm user={user}/>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 carePulse
            </p>
            <Link href='/?admin=true' className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image src='/assets/images/register-img.png' height={1000} width={1000} alt="pateint form " className="side-img " />

    </div>
 
  )
}

export default register
    