import { Button } from './ui/button';
import Image from 'next/image';

interface Props {
    isloading: boolean;
    children: React.ReactNode;
    className?: string;
}
const SubmitButton = ({ className, children, isloading }: Props) => {
    return (
        <Button type='submit' disabled={isloading} className={className ?? "shad-primary-btn w-full"}>
            {isloading ? (
                <div className='flex items-center gap-4 text-white'>
                    <Image src='/assets/icons/loader.svg' width={24} alt='loader' className='animate-spin' height={24}/> 
                    Loading...
                </div>
            ) : children}
        </Button>
    )
}

export default SubmitButton
