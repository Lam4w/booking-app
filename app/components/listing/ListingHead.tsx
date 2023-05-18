'use client';
import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { useState } from "react";
import { TbGridDots } from "react-icons/tb";
import { IoChevronBackOutline } from 'react-icons/io5';
import { data } from "autoprefixer";
import SlideIn from "../SlideIn";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string[];
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const [isShowAll, setIsShowALl] = useState(false);
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    let bodyContent = (
        <div className="w-full h-[55vh] overflow-hidden rounded-xl relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
            <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 flex">
                <div 
                    onClick={() => setIsShowALl(true)}
                    className="w-full h-full cursor-pointer hover:brightness-[.85] hover:transition"
                >
                    <img src={imageSrc[0]} alt="Image" className="w-full h-full object-cover max-h-[55vh]"/>
                </div>
            </div>
            <div className="hidden md:grid col-span-1 grid-rows-2 gap-2">
                <div 
                    onClick={() => setIsShowALl(true)}
                    className="w-full h-full cursor-pointer hover:brightness-[.85] hover:transition"
                >
                    <img src={imageSrc[1]} alt="Image" className="w-full h-full object-cover max-h-[27vh]"/>
                </div>
                <div 
                    onClick={() => setIsShowALl(true)}
                    className="w-full h-full cursor-pointer hover:brightness-[.85] hover:transition"
                >
                    <img src={imageSrc[2]} alt="Image" className="w-full h-full object-cover max-h-[27vh]"/>
                </div>
            </div>
            <div className="hidden md:grid col-span-1 grid-rows-2 gap-2">
                <div 
                    onClick={() => setIsShowALl(true)}
                    className="w-full row-span-1 h-full cursor-pointer hover:brightness-[.85] hover:transition"
                >
                    <img src={imageSrc[3]} alt="Image" className="w-full h-full object-cover max-h-[27vh]"/>
                </div>
                <div 
                    onClick={() => setIsShowALl(true)}
                    className="w-full row-span-1 h-full cursor-pointer hover:brightness-[.85] hover:transition"
                >
                    <img src={imageSrc[4]} alt="Image" className="w-full h-full object-cover max-h-[27vh]"/>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading 
                    title={title}
                    subtitle={`${location?.region}, ${location?.label}`}
                />
                <div className="flex items-center gap-2 hover:bg-neutral-100 rounded-lg p-2">
                    <HeartButton 
                        listingId={id}
                        currentUser={currentUser || null}
                    />
                    <p className="text-base underline text-black">
                        favorite
                    </p>
                </div>
            </div>
            <div className="relative">
                {bodyContent}
                <div 
                    className="flex gap-2 items-center px-3 py-1 border-black border absolute bottom-5 right-5 bg-white rounded-lg cursor-pointer"
                    onClick={() => setIsShowALl(true)}
                >
                    <TbGridDots size={18} />
                    <p className="text-base font-semibold text-black">
                        Show all photos
                    </p>
                </div>
            </div>
            <SlideIn startAnimation={isShowAll}>
                <div className="overflow-y-scroll h-full">
                    <div className="flex justify-between p-3 sticky top-0 bg-white z-10">
                        <IoChevronBackOutline 
                            size={36} 
                            className="p-2 hover:bg-slate-100 rounded-full cursor-pointer"
                            onClick={() => setIsShowALl(false)}
                        />
                        <div className="flex items-center gap-2 hover:bg-neutral-100 rounded-lg p-2">
                            <HeartButton 
                                listingId={id}
                                currentUser={currentUser || null}
                            />
                            <p className="text-base font-semibold underline text-black">
                                Favorite
                            </p>
                        </div>
                    </div>
                    <div className="pt-7 pb-16 flex flex-col items-center gap-2">
                        {imageSrc.length > 0 && imageSrc.map((image, index) => (
                            <img src={image} key={index} alt="Image" className="w-[750px]"/>
                        ))}
                    </div>
                </div>
            </SlideIn>
        </>
    )
}

export default ListingHead
