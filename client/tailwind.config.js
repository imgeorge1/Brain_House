/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        about: "url('/src/assets/about.jpg')",
        aboutus: "url('/src/assets/aboutus.jpg')",
        contact: "url('/src/assets/contact.jpg')",
      },
      backgroundRepeat: {
        "no-repeat": "no-repeat",
      },
    },
  },
  plugins: [],
};
