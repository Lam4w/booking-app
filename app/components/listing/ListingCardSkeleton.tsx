'use client';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

interface ListingCardSkeletonProps {
    count: number;
}

const ListingCardSkeleton = ({ count }: ListingCardSkeletonProps) => {
    const tempArr = Array(count).fill(0);

    return (
        <>
            {tempArr.map((item, index) => (
                <div 
                    className="col-span-1"
                    key={index}
                >
                    <div 
                        className="flex flex-col gap-2 w-full" 
                    >
                        <div className="aspect-square w-full h-full rounded-xl overflow-hidden">
                            <div className="aspect-square w-full">
                                <Skeleton className="h-full w-full"/>
                            </div>
                        </div>
                        <div className="w-36">
                            <Skeleton />
                        </div>
                        <div className="w-20">
                            <Skeleton />
                        </div>
                        <div className="w-24">
                            <Skeleton />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
};

export default ListingCardSkeleton