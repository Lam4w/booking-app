import prisma from '@/app/libs/prismadb';

export interface IListingParams {
    userId?: string;
    category?: string;
    locationValue?: string;
    roomCount?: number;
    guestCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
}

export default async function getListings (
    params: IListingParams
) {
    try {
        const {
            userId,
            category,
            locationValue,
            roomCount,
            guestCount,
            bathroomCount,
            startDate,
            endDate
        } = params;
        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (roomCount) {
            query.roomCount = { gte: +roomCount };
        }

        if (guestCount) {
            query.guestCount = { gte: +guestCount };
        }

        if (bathroomCount) {
            query.bathroomCount = { gte: +bathroomCount };
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: endDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: startDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        // return listing;
        const safeListing = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeListing;
    } catch (err: any) {
        throw new Error(err);
    }
}