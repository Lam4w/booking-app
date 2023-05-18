'use client';
import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { IoChevronForwardOutline } from 'react-icons/io5';
import { useState } from "react";
import SlideIn from "../SlideIn";
import { IoClose } from 'react-icons/io5';

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const { getByValue } = useCountries();
    const [isShowDesc, setIsShowDesc] = useState(false);

    const coordinates = getByValue(locationValue)?.latlng;
    return (
        <>
            <div className="col-span-4 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <div className="text-xl font-semibold flex flex-row items-center gap-2 justify-between">
                        <div className="">
                            Hosted by {user?.name}
                        </div>
                        <Avatar 
                            src={user?.image}
                            large
                        />
                    </div>
                    <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                        <div className="">
                            {guestCount} guests
                        </div>
                        <div className="">
                            {roomCount} rooms
                        </div>
                        <div className="">
                            {bathroomCount} bathrooms
                        </div>
                    </div>
                </div>
                <hr />
                {category && (
                    <ListingCategory 
                        icon={category.icon}
                        label={category.label}
                        description={category.description}
                    />
                )}
                <hr />
                <h1 className="text-2xl font-bold text-black">About this place</h1>
                <div className="text-base text-neutral-900 max-h-36 text-ellipsis overflow-hidden">
                    {description}
                </div>
                <div 
                    onClick={() => setIsShowDesc(true)}
                    className="flex items-center gap-1 cursor-pointer"
                >
                    <p className="font-semibold underline">
                        Show more
                    </p>
                    <IoChevronForwardOutline size={18}/>
                </div>
                <hr />
                <Map center={coordinates}/>
            </div>
            <SlideIn startAnimation={isShowDesc} description>
                <div className="relative w-full md:w-4/4 md:h-4/4 lg:w-2/3 lg:h-[86%] xl:w-1/2 my-6 mx-auto h-full md:h-auto bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="flex justify-between p-5 sticky top-0 bg-white z-10">
                        <IoClose 
                            size={29} 
                            className="p-1 hover:bg-neutral-100 rounded-full cursor-pointer"
                            onClick={() => setIsShowDesc(false)}
                        />
                    </div>
                    <div className="px-6 pb-6 overflow-y-scroll h-full">
                        <h1 className="text-2xl font-bold pt-2 pb-2">
                            About this space
                        </h1>
                        <div className="text-base text-neutral-900 py-6">
                            {description}
                        </div>
                    </div>
                </div>
            </SlideIn>
        </>
    )
}

export default ListingInfo