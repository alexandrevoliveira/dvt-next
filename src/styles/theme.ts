import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    white: {
      "bg": "#f2f2f2"  
    },
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    },
    purple: {
      "dvt-light": "#996DFF",
      "dvt-mid": "#8257E5",
      "dvt-dark": "#633BBC"
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
      },
      body: {
        bg: 'gray.900',
        color: 'black'
      }
    }
  }
})