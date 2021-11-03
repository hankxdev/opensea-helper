import * as React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {extendTheme} from '@chakra-ui/react';
import Popup from './Popup';
import { theme } from '../../theme';



const customizedTheme = extendTheme(theme)
export default function App() {
  return (
    <ChakraProvider theme={customizedTheme}>
      <Popup />
    </ChakraProvider>
  );
}

render(<App />, window.document.querySelector('#app'));
