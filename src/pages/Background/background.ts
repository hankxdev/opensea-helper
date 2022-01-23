import * as cheerio from 'cheerio'

import {ACTION_NAME, crm} from '../../consts'
import {checkToken, loopWithDelay} from '../../utils';
import {getData, removeData, saveData} from '../../storage'

import {CMD_NAME} from '../../consts';
import {ITrackingCollection} from '../../intefaces';
import {getCollectionData} from '../Popup/services';

const tracking = true // todo make it as a setting

let verified = false
const checkUser = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('user', i => {
      if (!i.user) {
        verified = false
        resolve(false)
        return
      }
      const {token, address} = i.user
      verified = checkToken(address, token)
      if (!verified) {
        removeData('user')
      }
      resolve(verified)
    })
  }) as Promise<boolean>
}


checkUser()

const alarm = crm.a

let trackingTokens: ITrackingCollection[] = []
let apexToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlfQ.9zwFEsTv43zB7vv-4nJ_KShuUb0EzzH5pfZrqN154rw'

alarm.clearAll(() => {
  getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((data) => {
    if (!data || data.length < 1 || !verified) {
      console.log('no tracking token')
      return
    }

    trackingTokens = data
    if (!tracking) {
      console.log('tracking is off')
      return
    }

    console.log('tracking is on')

    loopWithDelay((token: ITrackingCollection) => {
      return new Promise((resolve) => {
        alarm.create(token.name, {
          when: Date.now() + 5 * 1000
        })
        console.log(`tracking for ${token.name} has been set...`)
        resolve()
      })
    }, 2000, data)
  })
})


alarm.onAlarm.addListener(alarm => {
  console.log(`${alarm.name} alarm has been triggered`)
  const token = trackingTokens.find(t => t.name === alarm.name)
  if (!token || !verified) {
    console.log('no token found')
    return
  }
  getCollectionInfo(token);
})

async function getCollectionInfo(token: ITrackingCollection) {
  try {
    const data = await getCollectionData(token)
    const banner = data.collection.banner_image_url
    const price = data.collection.stats.floor_price
    console.log(`${token.name} price is ${price}`)

    if (token.price >= price && token.tracking) {
      token.tracking = false
      console.log('price is lower, notifying...')
      scanCollectionPage(buildCollectionURL(token.name))
    }

    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((data) => {
      const index = data.findIndex((t: ITrackingCollection) => t.name === token.name)
      data[index].currentPrice = price
      data[index].banner = banner
      data[index].tracking = token.tracking
      saveData(ACTION_NAME.TRACKING_TOKEN_LIST, data)
    })
  } catch (e) {
    console.log(e)
  } finally {
    alarm.clear(token.name).then(() => {
      alarm.create(token.name, {
        when: Date.now() + 5 * 1000
      })
    })
  }
}

const buildCollectionURL = (tokenName: string): string => {
  return `https://opensea.io/collection/${tokenName}??search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW`

}

const buildAssetURL = (assetID: string) => {
  return `https://opensea.io${assetID}`
}
const scanCollectionPage = async (url: string) => {
  const data = await fetch(url)
  const html = await data.text()
  const onlyBody = html.split('<body>')[1].split('</body>')[0]
  const $ = cheerio.load(onlyBody)
  const firstToken = $('article').first().find('a').first().attr('href') || ''
  // opent this token in opensea
  // TODO make it as a setting
  chrome.tabs.create({url: buildAssetURL(firstToken)})
}

const getApexToken = async () => {
  try {
    const response = await fetch(`https://apexgo-api.herokuapp.com/v1/auth`, {method: 'POST'});
    const token = await response.json();
    console.log(token)
    apexToken = token
    await chrome.storage.sync.set({token});
  } catch (e) {
    console.log(e)
  }
}

getApexToken()

const getRarityURL = (tokenId: string, collectionName: string): string => {
  return `https://apexgo-api.herokuapp.com/v1/getToken?token_id=${tokenId}&collection_name=${collectionName}`;
}

const saveTrackingCollection = async (collection: ITrackingCollection, sender: chrome.runtime.MessageSender) => {
  try {
    const result = await getData(ACTION_NAME.TRACKING_TOKEN_LIST) as Array<ITrackingCollection>
    let collections = result ? result : []
    const extraData = await getCollectionData(collection)
    collection.banner = extraData.collection.banner_image_url
    collection.currentPrice = extraData.collection.stats.floor_price
    collection.tracking = true
    const collectionIndex = collections.findIndex(
      (item: ITrackingCollection) => item.url === collection.url
    )
    if (collectionIndex !== -1) {
      collections[collectionIndex] = collection
    } else {
      collections.push(collection)
    }
    await saveData(ACTION_NAME.TRACKING_TOKEN_LIST, collections)
    // @ts-ignore
    crm.t.sendMessage(sender.tab.id, {cmd: "collectionAdded"})
  } catch (e) {
    // @ts-ignore
    crm.t.sendMessage(sender.tab.id, {cmd: "collectionNotAdded"})
  }


}


crm.r.onMessage.addListener((req, sender, sendResponse) => {
  if (!verified && req.cmd !== 'updateVerifyStatus') {
    return
  }
  switch (req.cmd) {
    case CMD_NAME.GET_TOKEN_RARITY:
      const {tokenId, collectionName} = req.data
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${apexToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      // @ts-ignore
      fetch(getRarityURL(tokenId, collectionName), requestOptions).then(res => res.json()).then(res => {
        // @ts-ignore
        chrome.tabs.sendMessage(sender.tab.id, {
            cmd: CMD_NAME.SET_TOKEN_RARITY,
            data: res
          }
        )
      })
      break;
    case 'updateVerifyStatus':
      verified = req.verified
      break;
    case 'addCollection':
      const {name, url, price} = req.data
      saveTrackingCollection({
        address: url,
        name,
        tracking: true,
        url,
        price,
      }, sender)
      break;
  }
})
