'use client';

interface SlideInProp {
    children: React.ReactNode;
    startAnimation: boolean;
    description?: boolean;
}

const SlideIn: React.FC<SlideInProp> = ({ children, startAnimation, description }) => {
    const transtionProperties = startAnimation
    ? { transform: "translateY(0)" }
    : {};

    const isDescription = description ? "flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70" : "fixed bg-white min-w-full h-full inset-0"

    return (
        <div className={`${isDescription} z-50 transition-transform ease-out duration-200 translate-y-[100%]`} style={transtionProperties}>
            {children}
        </div>
    )
}

export default SlideIn