import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams?.admin === 'true';
  return (
    <div className="flex h-screen max-h-screen">{isAdmin && <PasskeyModal />}
      <section className="container remove-scrollbar my-auto">
        <div className="sub-container max-w-[496px]">
          <Link href='/'>
            <Image src='/assets/icons/logo-full.svg' height={1000} width={1000} alt="logo" className="mb-10 h-12 w-fit" />
          </Link>
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 carePulse
            </p>
            <Link href='/?admin=true' className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image src='/assets/images/onboarding-img.png' height={1000} width={1000} alt="pateint form " className="side-img max-w-[50%]" />

    </div>
  );
}
