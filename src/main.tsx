import React from 'react'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from "@/App";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

// extending the theme
const colors = {
    brand: {
        900: '#024fc9',
        800: '#146af5',
        700: '#2977f2',
        600: '#337df2',
        500: '#4287f5'
    },
}
const fonts = {
    // body: 'Courier New',
    // heading: 'Courier New'
}

const theme = extendTheme({ colors, fonts })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <App/>
          </QueryClientProvider>
      </ChakraProvider>
  </React.StrictMode>,
)
