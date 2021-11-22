export interface ITrackingToken {
  address: string,
  name: string,
  tracking : boolean,
  url: string,
  price: number
}



export interface  IGasFee {
  instant: number,
  fast: number,
  standard: number,
  low: number,
}