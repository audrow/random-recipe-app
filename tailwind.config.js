module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    borderWidth:{
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },

    extend: {
      fontFamily: {
        'baloo': ['Baloo 2'],
        'lobster': ['lobster'],
      },
      colors:{
        'pink': '#E17381',
        'lt-pink': '#FED8D8',
        'yellow': '#EBD470',
        'navy': '#0B3954',
        'lblue': '#739AA5',
        'lgreen': '#9CC0AD',
        'lrgreen': '#D6F4E4',
        'white': "#ffffff",
        'black': "#000000",
      },
    },
  },
  plugins: [],
}