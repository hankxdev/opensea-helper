import { IUserInfo } from './intefaces'

export const emptyUserInfo: IUserInfo = {
  address: '',
  token: '',
  isPaidUser: false,
  network: '',
}

type ACTION_TYPE = { type: 'get' } | { type: 'update', userInfo: IUserInfo } | { type: 'reset' }


export const userReducer = (state: { userInfo: IUserInfo }, action: ACTION_TYPE) => {
  switch (action.type) {
    case 'get':
      return state
    case 'update':
      return {
        userInfo: {
          ...action.userInfo,
        },
      }
    case 'reset':
      return {
        userInfo: {
          ...emptyUserInfo,
        },
      }
    default:
      return state
  }
}
