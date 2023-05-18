'use client';
import useCountries from "@/app/hooks/useCountry";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? data.imageSrc.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        console.log('running');
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === data.imageSrc.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const handleCanel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation]);

    return (
        <div 
            className="col-span-1 group cursor-pointer relative"
        >
            <div className="absolute top-0 w-full aspect-square">
                <div 
                    className="hidden group-hover:block absolute top-[50%] -translate-x-0 left-2 cursor-pointer p-2 rounded-full bg-slate-100 bg-opacity-90 shadow-md transition z-50 hover:bg-white duration-500"
                    onClick={prevSlide}    
                >
                    <IoChevronBackOutline size={13} />
                </div>
                <div 
                    className="hidden group-hover:block absolute top-[50%] -translate-x-0 right-2 cursor-pointer p-2 rounded-full bg-slate-100 bg-opacity-90 shadow-md transition z-50 hover:bg-white duration-500"
                    onClick={nextSlide}    
                >
                    <IoChevronForwardOutline size={13} />
                </div>
            </div>
            <div 
                className="flex flex-col gap-2 w-full" 
                onClick={() => router.push(`/listings/${data.id}`)}
            >
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <div className="flex">
                        {data.imageSrc.map((image, index) => (
                            <img src={image} key={index} className="aspect-square w-full object-cover duration-500 transition-transform ease-out duration-500" alt="Image" style={{ transform: `translateX(-${currentIndex * 100}%)`}}/>
                        ))}
                    </div>

                    {/* <Image 
                        fill
                        alt="Listing"
                        src={data.imageSrc[0]}
                        className="h-full w-full object-cover group-hover:scale-110 transition "
                    /> */}

                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser || null}
                        />
                    </div>
                </div>
                <div className="font-semibold text-medium">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-rol items-center gap-1">
                    <div className="font-semibold">
                        ${price}
                    </div>
                    {!reservation && (
                        <div className="font-light">
                            night
                        </div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCanel}
                    />
                )}
            </div>
        </div>
    )
}

export default ListingCard