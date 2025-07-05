// tailwind.config.js
module.exports = {
    content: [".src/**/*.{astro,html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            woodLight: '#e9d8b4',
            woodDark: '#b18c5a',
            slateLight: '#d2d2da',
            slateDark: '#4b4f57',
        },
        boxShadow: {
            board: '0 0 40px -10px rgba(0,0,0,0.7)',
        },
        keyframes: {
            slowspin: { 'to': { transform: 'rotate(360deg)' } },
            pop:      { '0%': { transform:'scale(0.8)', opacity:0 },
                        '100%': { transform:'scale(1)',   opacity:1 } },
        },
        animation: {
            slowspin: 'slowspin 60s linear infinite',
            pop:      'pop 150ms ease-out',
        },
    },
    plugins: [],
}