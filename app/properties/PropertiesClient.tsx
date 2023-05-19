'use client';
import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listing/ListingCard";
import useEditModal from "../hooks/useEditModal";
import EditModal from "../components/modals/EditModal";
import useConfirmationModal from "../hooks/useConfirmationModal";
import Modal from "../components/modals/Modal";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {
    const editModal = useEditModal();
    const confirmationModal = useConfirmationModal();
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const [editData, setEditData] = useState<SafeListing | null>(null);

    const onEdit = (data: SafeListing) => {
        setEditData(data);
        editModal.onOpen(); 
    }

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        confirmationModal.onOpen();
    }, [confirmationModal]);

    const onCancelDelete = useCallback(() => {
        setDeletingId('');
        confirmationModal.onClose();
    }, [confirmationModal]);

    const onDelete = useCallback(() => {
        axios.delete(`/api/listing/${deletingId}`)
            .then(() => {
                toast.success('Listing deleted');
                confirmationModal.onClose();
                router.refresh();
            })
            .catch(() => {
                toast.error('Something is wrong');
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router, deletingId, confirmationModal]);

    return (
        <>
            <Container>
                <Heading 
                    title="Properties"
                    subtitle="List of your properties"
                />
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {listings.map((listing) => (
                        <>
                            <ListingCard 
                                key={listing.id}
                                data={listing}
                                disabled={deletingId === listing.id}
                                currentUser={currentUser}
                                actionId={listing.id}
                                onAction={onCancel}
                                actionLabel="Delete" 
                                secondaryActionId="id"
                                secondaryOnAction={onEdit}
                                secondaryActionLabel="Edit"
                            />
                        </>
                    ))}
                </div>
            </Container>
            {editData && <EditModal data={editData} onAction={() => setEditData(null)}/>}
            {deletingId && <Modal 
                                title='Do you want to delete this property'
                                isOpen={confirmationModal.isOpen}
                                onClose={onCancelDelete}
                                onSubmit={onCancelDelete}
                                actionLabel="Cancel"
                                secondaryActionLabel="Delete property"
                                secondaryAction={onDelete}
                            />
            }
        </>
    )
}

export default PropertiesClient