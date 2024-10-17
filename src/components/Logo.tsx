import Image from "next/image";
import { FC } from "react";

interface LogoProps {
  width: number;
  height: number;
}

const Logo: FC<LogoProps> = ({ width, height }) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/logo.png"
        alt="Site Logo"
        width={width}
        height={height}
        className="rounded"
      />
    </div>
  );
};

export default Logo;
