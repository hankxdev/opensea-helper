export interface ITrackingCollection {
  address: string,
  name: string,
  tracking: boolean,
  url: string,
  price: number,
  banner: string,
  currentPrice: number
}



export interface IGasFee {
  instant: number,
  fast: number,
  standard: number,
  low: number,
}


export interface IBasicOptions {
  changeUI: boolean
  autoBuy: boolean
  showNotify: boolean
}