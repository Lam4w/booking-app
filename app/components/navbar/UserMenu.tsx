'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

interface userMenuProps {
    currentuser?: SafeUser | null;
}

const UserMenu: React.FC<userMenuProps> = ({ currentuser }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, []);

    const onRent = useCallback(() => {
        if (!currentuser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    }, [currentuser, loginModal, rentModal]);      

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={onRent}
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
                Airbnb your home
            </div>
            <div
                onClick={toggleOpen}
                className="p-4 md:py-1 md:px-2 border-[1px] flex felx-row border-neutral-200 items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={currentuser?.image}/>
                </div>
            </div>
        </div>

        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40px] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                    {currentuser ? (
                        <>
                            <MenuItem onCLick={() => router.push('/trips')} label='My trips'/>
                            <MenuItem onCLick={() => router.push('/favorites')} label='My favourites'/>
                            <MenuItem onCLick={() => router.push('/reservations')} label='My reservations'/>
                            <MenuItem onCLick={() => router.push('/properties')} label='My properties'/>
                            <MenuItem onCLick={rentModal.onOpen} label='Airbnb my home'/>
                            <MenuItem onCLick={() => signOut()} label='Logout'/>
                        </>
                    ) : (
                        <>
                            <MenuItem onCLick={loginModal.onOpen} label='Login'/>
                            <MenuItem onCLick={registerModal.onOpen} label='Sign up'/>
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu