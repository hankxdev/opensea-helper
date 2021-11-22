import { ACTION_NAME, crm } from '../../consts'

import { ITrackingToken } from '../Popup/intefaces';
import axios from 'axios';
import { getData } from '../../storage'
import { loopWithDelay } from './../../utils';
import { openseaAPI } from '../../consts';

const tracking = true // todo make it as a setting


const alarm = crm.a

let trackingTokens: ITrackingToken[] = []


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

    loopWithDelay((token: ITrackingToken) => {
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

async function getCollectionInfo(token: ITrackingToken) {
  let needRedo = true
  try {
    const result = await fetch(`${openseaAPI.baseURL}/collection/${token.name}`, {
      method: 'GET',
      headers: openseaAPI.headers,
      mode: 'cors',
    })
    const data = await result.json()
    if (!data) {
      console.log('no data, you might need to check the api')
      return
    }
    const price = data.collection.stats.floor_price
    console.log(`${token.name} price is ${price}`)
    if (token.price >= price) {
      needRedo = false
      console.log('price is lower, notifying...')
      crm.t.create({ url: token.url })
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

