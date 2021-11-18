import { isTypeNode } from "typescript";

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

