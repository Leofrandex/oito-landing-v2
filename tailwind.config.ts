import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#004346", // Deep Teal - Primary Brand Color
                accent: "#09bc8a", // Mint - Primary Action Color
                "accent-light": "#09bc8a", // Mint - Secondary Accent (Unified)
                charcoal: "#333333", // Charcoal - Body Text
                dark: "#1a1a1a", // Dark Gray - Headings
                light: "#ffffff", // White - Background & Contrast
                muted: "#e5e5e5", // Muted text
            },
            fontFamily: {
                sans: ["var(--font-dm-sans)", "sans-serif"],
                display: ["var(--font-dongle)", "sans-serif"],
                serif: ["var(--font-serif)", "serif"],
            },
        },
    },
    plugins: [],
};
export default config;
