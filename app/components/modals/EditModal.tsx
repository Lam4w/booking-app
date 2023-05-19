'use client';
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { categories } from '../navbar/Categories';
import Modal from './Modal';
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import Counter from '../inputs/Counter';
import ImageUpLoad from '../inputs/ImageUpLoad';
import Input from '../inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useEditModal from '@/app/hooks/useEditModal';
import { SafeListing } from '@/app/types';

interface EditModalProps {
    data: SafeListing 
    onAction: () => void;
}

enum STEPS {
    CATEGORY = 0,
    INFO = 1,
    DESCRIPTION = 2,
    PRICE = 3,
    IMAGES = 4,
}

const EditModal: React.FC<EditModalProps> = ({ data, onAction }) => {
    const router = useRouter();
    const editModdal = useEditModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: data.category,
            location: data.locationValue,
            guestCount: data.guestCount,
            roomCount: data.roomCount,
            bathroomCount: data.bathroomCount,
            price: data.price,
            title: data.title,
            description: data.description,
        }
    });
    const listingId = data.id;
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const [imageList, setImageList] = useState<string[]>(data.imageSrc);
    
    const setUploadImageList = (value: any) => {
        setImageList((prev) => [...prev, value]);
    }

    const removeUploadImageList = (value: any) => {
        const filteredList = imageList.filter((item) => item !== value);
        setImageList(filteredList);
    }

    const setCutomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onBack = () => {
        setStep((prev) => prev - 1);
    };

    const onNext = () => {
        setStep((prev) => prev + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.IMAGES) {
            return onNext();
        }

        if (imageList.length < 4) {
            toast.error('You need to upload atleast 5 images');
            return;
        }

        const safeData = {
            ...data,
            'imageSrc': [...imageList]
        }

        setIsLoading(true);
        axios.patch(`/api/listing/${listingId}`, safeData)
            .then(() => {
                toast.success('Listing updated');
                router.refresh();
                reset();
                setImageList([]);
                setStep(STEPS.CATEGORY);
                editModdal.onClose();
                onAction();
            })
            .catch(() => {
                toast.error('Something went wrong');                
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.IMAGES) {
            return 'Update';
        }
         return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title='Which of these best describes your place?'
                subtitle='Pick a category'
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCutomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title='Share some basics about your place'
                    subtitle='What amemitites do you have?'
                />
                <Counter 
                    title='Guests'
                    subtitle='How many guests do you allow?'
                    value={guestCount}
                    onChange={(value) => setCutomValue('guestCount', value)}
                />
                <hr />
                <Counter 
                    title='Rooms'
                    subtitle='How many rooms do you allow?'
                    value={roomCount}
                    onChange={(value) => setCutomValue('roomCount', value)}
                />
                <hr />
                <Counter 
                    title='Bathrooms'
                    subtitle='How many bathrooms do you allow?'
                    value={bathroomCount}
                    onChange={(value) => setCutomValue('bathroomCount', value)}
                />
                <hr />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title='how would you describe yout place?'
                    subtitle='Short and sweet works best'
                />
                <Input 
                    id='title'
                    label='Title'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id='description'
                    label='Description'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
            </div>
        )
    }
    
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title='Now, set your price'
                    subtitle='How much do you charge per night?'
                />
                <Input 
                    id='price'
                    label='Price'
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title='Add a photo of your place'
                    subtitle='Show guests what your place looks like'
                />
                <ImageUpLoad 
                    value={imageList}
                    onChange={(value) => setUploadImageList(value)}
                    onRemove={(value) => removeUploadImageList(value)}
                />
            </div>
        )
    }

    return (
        <Modal 
            title='Airbnb your home'
            isOpen={editModdal.isOpen}
            onClose={editModdal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default EditModal