'use client';

interface MenuItemProps {
    onCLick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onCLick, label}) => {
  return (
    <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={onCLick}>
        {label}
    </div>
  )
}

export default MenuItem