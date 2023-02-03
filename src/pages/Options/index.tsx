import './Options.scss'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('app'),
)
