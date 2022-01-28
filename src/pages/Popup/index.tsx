import * as React from 'react';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {IUserInfo} from "../../intefaces";
import Popup from './Popup';
import {render} from 'react-dom';
import {theme} from '../../theme';

const defaultContextValue = {
  userInfo: {
    token: '',
    address: '',
    network: '',
    isPaidUser: false,

  } as IUserInfo,
  setUserInfo: (userInfo: IUserInfo) => {
  },
}

export const UserContext = React.createContext(defaultContextValue)


const customizedTheme = extendTheme(theme)
export default function App() {
  return (
    <ChakraProvider theme={customizedTheme}>
      <UserContext.Provider value={defaultContextValue}>
        <Popup/>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

render(<App/>, window.document.querySelector('#app'));
