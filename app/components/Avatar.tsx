'use client';
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
  large?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ src, large }) => {
  return (
    <Image className="rounded-full" height={large ? 48 : 30} width={large ? 48 : 30} alt="Avatar" src={src || "/images/placeholder.jpg"}/>
  )
}

export default Avatar