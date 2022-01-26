// shortcuts for chrome extension api
export const crm = {
  s: chrome.storage.sync,
  r: chrome.runtime,
  t: chrome.tabs,
  a: chrome.alarms,
  n: chrome.notifications
}


export const openseaAPI = {
  baseURL: 'https://api.opensea.io/api/v1',
  token: '',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

export const ACTION_NAME = {
  SET_TOKEN: 'SET_TOKEN',
  SET_TOKEN_SUCCESS: 'SET_TOKEN_SUCCESS',
  SET_TOKEN_FAILURE: 'SET_TOKEN_FAILURE',
  GET_TOKEN: 'GET_TOKEN',
  GET_TOKEN_SUCCESS: 'GET_TOKEN_SUCCESS',
  GET_TOKEN_FAILURE: 'GET_TOKEN_FAILURE',
  GET_TOKEN_LIST: 'GET_TOKEN_LIST',
  GET_TOKEN_LIST_SUCCESS: 'GET_TOKEN_LIST_SUCCESS',
  GET_TOKEN_LIST_FAILURE: 'GET_TOKEN_LIST_FAILURE',
  GET_TOKEN_LIST_MORE: 'GET_TOKEN_LIST_MORE',
  GET_TOKEN_LIST_MORE_SUCCESS: 'GET_TOKEN_LIST_MORE_SUCCESS',
  GET_TOKEN_LIST_MORE_FAILURE: 'GET_TOKEN_LIST_MORE_FAILURE',
  GET_TOKEN_LIST_MORE_END: 'GET_TOKEN_LIST_MORE_END',
  GET_TOKEN_LIST_MORE_END_SUCCESS: 'GET_TOKEN_LIST_MORE_END_SUCCESS',
  GET_TOKEN_LIST_MORE_END_FAILURE: 'GET_TOKEN_LIST_MORE_END_FAILURE',
  GET_TOKEN_LIST_MORE_END_RESET: 'GET_TOKEN_LIST_MORE_END_RESET',
  GET_TOKEN_LIST_MORE_END_RESET_SUCCESS: 'GET_TOKEN_LIST_MORE_END_RESET_SUCCESS',
  GET_TOKEN_LIST_MORE_END_RESET_FAILURE: 'GET_TOKEN_LIST_MORE_END_RESET_FAILURE',
  TRACKING_TOKEN_LIST: "TRACKING_TOKEN_LIST",
}

export const CMD_NAME = {
  GET_TOKEN_RARITY: 'GET_TOKEN_RARITY',
  SET_TOKEN_RARITY: 'SET_TOKEN_RARITY',
}