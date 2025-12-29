import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sovrascriviamo il font sans di default di Tailwind
        sans: ['Lexend', 'sans-serif'],
        // Manteniamo Cal Sans per usi specifici (titoli)
        cal: ['"Cal Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;