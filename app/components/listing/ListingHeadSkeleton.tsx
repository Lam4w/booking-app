'use client';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ListingHeadSkeleton = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-start">
                    <div className="w-80 h-7">
                        <Skeleton className="h-full w-full"/>
                    </div>
                    <div className="mt-2 w-72 h-7">
                        <Skeleton className="h-full w-full"/>
                    </div>
                </div>
                <div className="rounded-lg p-2 w-20 h-8">
                    <Skeleton className="h-full w-full"/>
                </div>
            </div>
            <div className="relative">
                <div className="w-full h-[55vh] overflow-hidden rounded-xl relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
                    <div className="col-span-1 h-full sm:col-span-1 md:col-span-2 lg:col-span-2 flex">
                        <div className="w-full h-full">
                            <Skeleton className="h-full w-full"/>
                        </div>
                    </div>
                    <div className="hidden md:grid col-span-1 grid-rows-2 gap-2">
                        <div className="w-full h-full">
                            <Skeleton className="h-full w-full"/>
                        </div>
                        <div className="w-full h-full">
                            <Skeleton className="h-full w-full"/>
                        </div>
                    </div>
                    <div className="hidden md:grid col-span-1 grid-rows-2 gap-2">
                        <div className="w-full row-span-1 h-full">
                            <Skeleton className="h-full w-full"/>
                        </div>
                        <div className="w-full row-span-1 h-full">
                            <Skeleton className="h-full w-full"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )   
};

export default ListingHeadSkeleton