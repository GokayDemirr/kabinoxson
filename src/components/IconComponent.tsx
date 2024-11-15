import React from "react";

interface IconProps {
  color?: string; // Color for the icon, defaults to black
  width?: string; // Width of the icon, defaults to 24px
  height?: string; // Height of the icon, defaults to 24px
  className?: string; // Additional class names for custom styling
  rotate?: boolean; // Whether to rotate the icon by 180 degrees
  onClick?: () => void; // onClick handler to make the icon clickable
}

const IconComponent: React.FC<IconProps> = ({
  color = "#000000",
  width = "24",
  height = "24",
  className = "",
  rotate = false,
  onClick, // Add onClick to props
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={`${rotate ? "transform rotate-180" : ""} ${className}`}
      onClick={onClick} // Bind onClick to the SVG
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12.7071 7.70711C13.0976 7.31658 13.0976 6.68342 12.7071 6.29289C12.3166 5.90237 11.6834 5.90237 11.2929 6.29289L6.29289 11.2929C5.90237 11.6834 5.90237 12.3166 6.29289 12.7071L11.2929 17.7071C11.6834 18.0976 12.3166 18.0976 12.7071 17.7071C13.0976 17.3166 13.0976 16.6834 12.7071 16.2929L9.41421 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H9.41421L12.7071 7.70711Z"
        fill={color}
      ></path>
    </svg>
  );
};

export default IconComponent;
