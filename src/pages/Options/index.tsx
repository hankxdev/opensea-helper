import * as React from 'react'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import Options from './Options'
import { render } from 'react-dom'
import { theme } from '../../theme'

export default function App() {
  return (
    <ChakraProvider>
      <Options title="Options" />
    </ChakraProvider>
  )
}

render(<App />, window.document.querySelector('#app'))
