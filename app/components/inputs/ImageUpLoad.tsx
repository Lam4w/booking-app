'use client';
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { MdRemoveCircle } from "react-icons/md";

declare global {
    var cloudinary: any;
}

interface ImageUpLoadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
}

const ImageUpLoad: React.FC<ImageUpLoadProps> = ({ value, onChange, onRemove }) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget 
            onUpload={handleUpload}
            uploadPreset="emjq3qec"
            // options={{
            //     maxFiles: 1
            // }}
        >
            {({ open }) => {
                return (
                    <div
                        className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 relative border-dashed border-2 p-5 border-neutral-300"
                    >
                        {value.length !==0 && value.map((imageSrc, index) => (
                            <div className="relative col-span-1 h-32 flex" key={index}>
                                <div className="w-full">
                                    <Image 
                                        src={imageSrc}
                                        fill
                                        alt="Upload"
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                                <div 
                                    className=" absolute top-2 right-2 z-20 text-rose-600 cursor-pointer"
                                    onClick={() => onRemove(imageSrc)}    
                                >
                                    <MdRemoveCircle size={25} />
                                </div>
                            </div>
                        ))}

                        <div 
                            onClick={() => open?.()}
                            className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 flex items-center flex-col justify-center gap-4 cursor-pointer hover:opacity-70 transition h-32"
                        >
                            <TbPhotoPlus size={40}/>
                            <div className="font-semi text-lg">
                                Click to upload
                            </div>
                        </div>
                    </div>
                )}
            }
        </CldUploadWidget>
    )
}

export default ImageUpLoad