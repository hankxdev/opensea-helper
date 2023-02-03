import { IGasFee, ITrackingCollection } from './../../intefaces';

import { GasPriceOracle } from 'gas-price-oracle'
import { openseaAPI } from '../../consts';

const defaultGasPriceOption = {
  chainId: 1,
  defaultRpc: 'https://api.mycryptoapi.com/eth',
  timeout: 10000,
  defaultFallbackGasPrices: {
    instant: 28,
    fast: 22,
    standard: 17,
    low: 11,
  },
}


export const getGasPrice = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    fetch('https://api.anyblock.tools/ethereum/ethereum/mainnet/gasprice/').then(res => res.json()).then(res => {
      if (!res.health) {
        resolve(0)
      }
      resolve(res.standard && !isNaN(res.standard) ? res.standard : 0)
    }).catch(err => {
      console.log(err)
      resolve(0)
    })
  })
}


export const getEthPrice = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd').then(res => res.json()).then(res => {
      resolve(res.ethereum.usd)
    }).catch(err => {
      console.log(err)
      resolve(0)
    })
  })
}


export const getCollectionData = async (collection: ITrackingCollection) => {
  try {
    const result = await fetch(`${openseaAPI.baseURL}/collection/${collection.name}`, {
      method: 'GET',
      headers: openseaAPI.headers,
      mode: 'cors',
    })
    const data = await result.json()
    if (!data) {
      console.log('no data, you might need to check the api')
      return {}
    }
    return data
  } catch (e) {
    console.log('no data, you might need to check the api')
    return {}
  }
}