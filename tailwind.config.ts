import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Put the 'screens' property here under 'extend'
      screens: {
        deneme: "520px",
        fhdustu: "1920px",
      },
      fontFamily: {
        poppins: ["Poppins", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-gray": "#444444",
        "custom-black": "#171717",
        "custom-teal": "#00ADB5",
        "custom-red": "#DA0037",
        "custom-darkteal": "#76ABAE",
        "custom-white": "#EDEDED",
        "custom-color1": "#92C7CF",
        "custom-color2": "#AAD7D9",
        "custom-color3": "#FBF9F1",
        "custom-color4": "#E5E1DA",
        "custom-color5": "#142120",
        "custom-color6": "#9ea0a3",
      },
    },
  },
  plugins: [],
};

export default config;
