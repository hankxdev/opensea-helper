import * as cheerio from 'cheerio'

import { ACTION_NAME, crm } from '../../consts'

import { ITrackingCollection } from '../intefaces';
import { getCollectionData } from '../Popup/services';
import { getData } from '../../storage'
import { loopWithDelay } from './../../utils';
import { saveData } from './../../storage';

const tracking = true // todo make it as a setting


const alarm = crm.a

let trackingTokens: ITrackingCollection[] = []

alarm.clearAll(() => {
  console.log('alarm cleared')
  getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((data) => {
    if (data.length < 1) {
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
  if (!token) {
    console.log('no token found')
    return
  }
  getCollectionInfo(token);
})

async function getCollectionInfo(token: ITrackingCollection) {
  let needRedo = true
  try {
    const data = await getCollectionData(token)
    const banner = data.collection.banner_image_url
    const price = data.collection.stats.floor_price
    console.log(`${token.name} price is ${price}`)

    getData(ACTION_NAME.TRACKING_TOKEN_LIST).then((data) => {
      const index = data.findIndex((t: ITrackingCollection) => t.name === token.name)
      data[index].currentPrice = price
      data[index].banner = banner
      saveData(ACTION_NAME.TRACKING_TOKEN_LIST, data)
    })
    if (token.price >= price) {
      needRedo = false
      console.log('price is lower, notifying...')
      scanCollectionPage(buildCollectionURL(token.name))
      return
    }
  } catch (e) {
    console.log(e)
  } finally {
    if (!needRedo) {
      console.log('no need to redo')
      return
    }
    alarm.clear(token.name).then(() => {
      alarm.create(token.name, {
        when: Date.now() + 5 * 1000
      })
    })
  }
}

const buildCollectionURL = (tokenName: string): string => {
  return `https://opensea.io/collection/${tokenName}??search[sortAscending]=true&search[sortBy]=PRICE`

}

const buildAssetURL = (assetID: string) => {
  return `https://opensea.io/assets/${assetID}`
}
async function scanCollectionPage(url: string) {
  const data = await fetch(url)
  const html = await data.text()
  const onlyBody = html.split('<body>')[1].split('</body>')[0]
  const $ = cheerio.load(onlyBody)
  const firstToken = $('article').first().find('a').first().attr('href') || ''
  // opent this token in opensea
  // TODO make it as a setting
  chrome.tabs.create({ url: buildAssetURL(firstToken) })
}
