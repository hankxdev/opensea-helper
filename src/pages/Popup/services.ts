import { GasPriceOracle } from 'gas-price-oracle'
import { IGasFee } from '../intefaces'
import { ITrackingCollection } from './../intefaces';
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


export const getGasPrice = async () => {
  const oracle = new GasPriceOracle(defaultGasPriceOption)
  const gasPrice: IGasFee = await oracle.gasPrices(defaultGasPriceOption.defaultFallbackGasPrices)
  return gasPrice.standard
}


export const getEthPrice = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
  const data = await response.json()
  return data.ethereum.usd
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