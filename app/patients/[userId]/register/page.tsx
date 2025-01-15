import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const register = async({params: {userId}}:SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen remove-scrollbar">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 py-10 flex-col ">
          <Image src='/assets/icons/logo-full.svg' height={1000} width={1000} alt="logo" className="mb-10 h-12 w-fit" />
          <RegisterForm user={user}/>
            <p className="copyright py-12">
              © 2024 carePulse
            </p>
        </div>
      </section>
      <Image src='/assets/images/register-img.png' height={1000} width={1000} alt="pateint form " className="side-img max-w-[460px]" />

    </div>
 
  )
}

export default register
    