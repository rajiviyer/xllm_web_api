import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        khaki: "#A49E8D",
        pale_dogwood: "#DEC3BE",
        slate_gray: "#6B7F82",
        air_superiority_blue: "#7C99B4",
        beaver: "#A29587",
        coyote: "#846C5B",
        battleship_gray: "#7C898B",
        mountbatten_pink: "#A6808C",
        timber_wolf: "#D6CFCB",
        cal_polygreen: "#2C5530",
        viridian: "#668F80",
        princeton_orange: "#FF9933",
      },
    },
    plugins: [],
  },
};
export default config;
