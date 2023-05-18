'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <>
            <Image 
                className="hidden xl:block cursor-pointer lg:mr-20" 
                alt="Logo" 
                height={100} 
                width={100} 
                src="/images/logo.png"
                onClick={() => router.push('/')}
            />
            <Image 
                className="hidden md:block xl:hidden cursor-pointer lg:mr-20" 
                alt="Logo" 
                height={34} 
                width={34} 
                src="/images/logo_sm.png"
                onClick={() => router.push('/')}
            />
        </>
    )
}

export default Logo