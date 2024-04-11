import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'neon-white': '0 0 5px #FFF, 0 0 15px #FFF, 0 0 30px #FFF, 0 0 45px #F00, 0 0 60px #F00',
        'neon-yellow': '0 0 5px #ff0, 0 0 10px #ff0, 0 0 20px #ff0, 0 0 40px #ff0',
        'neon-fuchsia': '0 0 5px #f0f, 0 0 10px #f0f, 0 0 20px #f0f, 0 0 40px #f0f',
        'neon-cyan': '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff',
        'neon-red': '0 0 5px #f00, 0 0 10px #f00, 0 0 20px #f00, 0 0 40px #f00',
      },
    },
  },
  plugins: [],
};
export default config;
