// import Loader from "./components/loader";
import ListingCardSkeleton from "@/app/components/listing/ListingCardSkeleton";
import Container from "./components/Container";

const Loading = () => {
    return (
        <Container>
            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 overflow-hidden">
                <ListingCardSkeleton count={8}/>
            </div>
        </Container>
    )
}

export default Loading