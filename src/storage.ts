import { ArrayExpression } from '@typescript-eslint/types/dist/ast-spec'
import { crm } from './consts'
const s = crm.s


export const saveData = async (key: string, value: any) => {
  return new Promise((resolve, reject) => {
    s.set({ [key]: value }, () => {
      resolve(true)
    })
  })
}


export const getData = async (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    s.get(key, (result) => {
      if (!result || result.length === 0) {
        reject(null)
      }
      resolve(result[key])
    })
  })
}


export const removeData = async (key: string) => {
  return new Promise((resolve, reject) => {
    s.remove(key, () => {
      resolve(true)
    })
  })
}

