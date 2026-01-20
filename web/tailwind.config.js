/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                blade: {
                    900: '#0a0a0a', // Deepest black
                    800: '#1a1a1a', // Dark background
                    700: '#2d1b1b', // Dark reddish background
                    500: '#ff4500', // Neon Orange/Red (Main Accent)
                    400: '#ff8c00', // Dusty Orange
                    300: '#00ced1', // Neon Cyan (Secondary Accent)
                    100: '#e0e0e0', // Text
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Replace with futuristic font later
                mono: ['Fira Code', 'monospace'],
            },
            backgroundImage: {
                'cyber-gradient': 'linear-gradient(to right bottom, #1a1a1a, #2d1b1b)',
                'neon-glow': 'radial-gradient(circle at center, rgba(255, 69, 0, 0.15) 0%, rgba(10, 10, 10, 0) 70%)',
            }
        },
    },
    plugins: [],
}
