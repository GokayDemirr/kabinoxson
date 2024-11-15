import React from 'react';

interface ThicknessIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const ThicknessIcon: React.FC<ThicknessIconProps> = ({
  width = 48,
  height = 48,
  fill = '#000000',
}) => (
  <svg
    fill={fill}
    viewBox="-7.82 0 122.88 122.88"
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <defs>
        <style>{`.a{fill-rule:evenodd;}`}</style>
      </defs>
      <title>glass-window</title>
      <path
        className="a"
        d="M4.21,0H103a4.22,4.22,0,0,1,4.21,4.21V118.67a4.23,4.23,0,0,1-4.21,4.21H4.21A4.23,4.23,0,0,1,0,118.67V4.21A4.23,4.23,0,0,1,4.21,0ZM69,80.67a1.8,1.8,0,0,1,2.12,2.9l-4.87,3.59a1.8,1.8,0,0,1-2.12-2.9L69,80.67Zm19.12-16a1.8,1.8,0,1,1,2.33,2.74L75.9,79.72A1.8,1.8,0,1,1,73.58,77L88.11,64.65ZM89,78.92A1.79,1.79,0,1,1,91.3,81.7L68.41,100.39a1.79,1.79,0,1,1-2.26-2.78L89,78.92ZM37.18,42.55a1.8,1.8,0,1,1-2.13-2.9l4.87-3.59A1.8,1.8,0,1,1,42,39l-4.86,3.59Zm-19.13,16a1.8,1.8,0,1,1-2.32-2.74L30.26,43.5a1.8,1.8,0,0,1,2.32,2.74L18.05,58.57ZM17.13,44.3a1.79,1.79,0,0,1-2.26-2.78L37.75,22.83A1.79,1.79,0,1,1,40,25.61L17.13,44.3Zm-8.76-36H49.5V114.61H8.37V8.27Zm49.36,0H98.86V114.61H57.73V8.27Z"
      />
    </g>
  </svg>
);

export default ThicknessIcon;
