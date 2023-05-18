'use client';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ListingInfoSkeleton = () => {
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <div className="col-span-4 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 justify-between">
                        <div className="w-80 h-7">
                            <Skeleton className="w-full h-full"/>
                        </div>
                        <Skeleton circle width={50} height={50}/>
                    </div>
                    <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                        <div className="w-16 h-7">
                            <Skeleton className="w-full h-full"/>
                        </div>
                        <div className="w-16 h-7">
                            <Skeleton className="w-full h-full"/>
                        </div>
                        <div className="w-16 h-7">
                            <Skeleton className="w-full h-full"/>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className="order-first mb-10 md:order-last md:col-span-3 w-full h-full">
                <Skeleton className="h-full w-full"/>
            </div>
        </div>
        </>
    )   
};

export default ListingInfoSkeleton