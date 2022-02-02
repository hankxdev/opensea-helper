import { Dispatch, createContext } from 'react'

import { IUserInfo } from './intefaces'

export type AppState = {
  userInfo: IUserInfo
}

export const emptyUserInfo: IUserInfo = {
  address: '',
  token: '',
  isPaidUser: false,
  network: '',
}

export const initState: AppState = {
  userInfo: emptyUserInfo,
}

type AppActions = {
  type: 'SET_USER_INFO'
  payload: IUserInfo
} | {
  type: 'SET_NETWORK'
  payload: string
}|
{
  type: 'RESET_USER_INFO'
}





export const userReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload,
      }
    case 'SET_NETWORK':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          network: action.payload,
        },
      }
    case 'RESET_USER_INFO':
      return {
        ...state,
        userInfo: emptyUserInfo,
      }
    default:
      return state
  }
}

export const AppContext = createContext<{
  state: AppState,
  dispatch: Dispatch<AppActions>
}>({
  state: initState,
  dispatch: () => undefined
})
