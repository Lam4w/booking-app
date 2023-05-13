import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListing from "../actions/getFavoriteListing";
import FavoritesCLient from "./FavoritesCLient";

const ListingPage = async () => {
    const listings = await getFavoriteListing();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorites listing"
            />
        )
    }

    if (!currentUser) {
        return (
            <EmptyState 
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    return (
        <FavoritesCLient 
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default ListingPage