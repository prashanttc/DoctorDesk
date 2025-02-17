import PatientForm from "@/components/forms/PatientForm"
import Image from "next/image";
import Link from "next/link";


const Login = () => {
    return (
        <div className="flex h-screen max-h-screen">
          <section className="container remove-scrollbar my-auto">
            <div className="sub-container max-w-[496px]">
              <Link href='/'>
                <Image src='/assets/icons/logo-full.svg' height={1000} width={1000} alt="logo" className="mb-10 h-12 w-fit" />
              </Link>
              <PatientForm type="sign-in"/>
              <div className="text-14-regular mt-20 flex justify-between">
                <p className="justify-items-end text-dark-600 xl:text-left">
                  © 2024 carePulse
                </p>
              </div>
            </div>
          </section>
          <Image src='/assets/images/onboarding-img.png' height={1000} width={1000} alt="pateint form " className="side-img max-w-[50%]" />
  
        </div>
      );
}

export default Login
