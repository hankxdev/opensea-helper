import { AppContext, initState, userReducer } from '../../reducer'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React, { useReducer } from 'react'

import Popup from './Popup'
import { render } from 'react-dom'
import { theme } from '../../theme'

const customizedTheme = extendTheme(theme)

export default function App() {
  const [state, dispatch] = useReducer(userReducer, initState)
  return (
    <ChakraProvider theme={customizedTheme}>
      <AppContext.Provider value={{ state, dispatch }}>
        <Popup />
      </AppContext.Provider>
    </ChakraProvider>
  )
}

render(<App />, window.document.querySelector('#app'))
