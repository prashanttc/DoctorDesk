import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const dynamic = 'force-dynamic';

type NewAppointmentProps = {
  params: { userId: string }; 
};

const NewAppointment = async ({ params }: NewAppointmentProps) => {
  const { userId } = await params;
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen remove-scrollbar">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 py-10 justify-between">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="mb-10 h-12 w-fit"
              priority
            />
          </Link>
          <AppointmentForm userId={userId} type="create" patientId={patient.$id} />
          <p className="copyright py-12">© 2024 carePulse</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[300px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
