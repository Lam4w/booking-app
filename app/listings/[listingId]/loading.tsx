'use client';
import ListingHeadSkeleton from "@/app/components/listing/ListingHeadSkeleton";
import Container from "@/app/components/Container";

const Loading = () => {
    return (
        <Container>
            <div className="max-w-[1120px] mx-auto overflow-hidden">
                <div className="flex flex-col gap-6">
                    <ListingHeadSkeleton />
                    <ListingHeadSkeleton /> 
                </div>
            </div>
        </Container>
    )   
};

export default Loading