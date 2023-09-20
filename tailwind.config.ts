import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      primary: ["var(--font-space-grotesk)", ...fontFamily.mono],
    },
    extend: {},
  },
  plugins: [],
};
export default config;
