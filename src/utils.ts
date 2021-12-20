import { isTypeNode } from "typescript";

interface IDecodedToken {
  aud: string;
  exp: number
  iat: number
  iss: string
  sub: string
  uid: string
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loopWithDelay = async (
  callback: (e: any) => Promise<void>,
  delay: number,
  item: Array<any>,
) => {
  for (let i = 0; i < item.length; i++) {
    await callback(item[i]);
    await sleep(delay);
  }
}

export const parseJwt = (token: string): IDecodedToken => {
  try {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload) as IDecodedToken
  } catch (e) {
    return {
      aud: '',
      exp: 0,
      iat: 0,
      iss: '',
      sub: '',
      uid: '',
    }
  }

}


export const checkToken = (address: string, token: string): boolean => {
  const decodedToken = parseJwt(token);
  return decodedToken.uid === address && decodedToken.exp > Date.now() / 1000;
}