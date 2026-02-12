import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#1B2B48", // Deep Navy
                    light: "#F5F5F0",   // Warm Gray
                },
                secondary: {
                    DEFAULT: "#FAFAFA", // Soft White
                    mint: "#E8F3F1",    // Muted Mint
                },
                accent: {
                    DEFAULT: "#C5A065", // Premium Gold/Bronze
                },
            },
            fontFamily: {
                sans: ["var(--font-pretendard)", "sans-serif"],
                serif: ["var(--font-serif)", "serif"], // For emotional text
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "slide-up": "slideUp 0.5s ease-out forwards",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
