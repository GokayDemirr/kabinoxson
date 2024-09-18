import { FC } from "react";

interface TraitCardProps {
  IconComponent: FC<{ width?: string }>; // width'i opsiyonel yapıyoruz
  iconWidth: string;
  description: string;
}

const TraitCard: FC<TraitCardProps> = ({
  IconComponent,
  iconWidth,
  description,
}) => {
  return (
    <div className="flex flex-col w-64 items-center">
      <IconComponent width={iconWidth} />
      <div className="text-white">{description}</div>
    </div>
  );
};

export default TraitCard;
