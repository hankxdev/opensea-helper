import * as React from 'react';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {IUserInfo} from "../../intefaces";
import Popup from './Popup';
import {render} from 'react-dom';
import {theme} from '../../theme';

export interface IUserContext{
  userInfo: IUserInfo,
  setUserInfo: (userInfo: IUserInfo) => void
}

export const EmptyUserContext = {
  userInfo: {
    token: '',
    address: '',
    network: '',
    isPaidUser: false,
  },
  setUserInfo: (userInfo:IUserInfo) => {
  },
}

export const UserContext = React.createContext<IUserContext>(EmptyUserContext)

const customizedTheme = extendTheme(theme)
export default function App() {
  return (
    <ChakraProvider theme={customizedTheme}>
      <UserContext.Provider value={EmptyUserContext}>
        <Popup/>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

render(<App/>, window.document.querySelector('#app'));
