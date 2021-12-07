import { Network, OpenSeaPort } from 'opensea-js'

import $ from 'jquery'
import detectEthereumProvider from '@metamask/detect-provider'

let seaport = null

let option = {
  changeUI: true,
  autoBuy: false,
  showNotify: true
}


window.addEventListener('message', e => {
  if (e.data.type === 'ext_options') {
    const { options } = e.data
    option = options
    const { changeUI } = option
    changeOpenseaUI(changeUI)
  } else if (e.data.type === 'setRarityData') {
    const {  rarityData } = e.data
    console.log(e.data.rarityData)
   
    injectRarity(rarityData.token_id, rarityData.ranking, rarityData.score)
  }
})

function changeOpenseaUI(changeUI) {
  if (!changeUI) {
    return 0
  }
  const changeUIInterval = setInterval(() => {
    const tokenEls = $("article")
    tokenEls.each((_, el) => {
      injectBuyNowButton(el)
      requestRarityData(el)
    })
  }, 200)
  return changeUIInterval
}


function sendMessagetoPage(type, data) {
  window.postMessage({ type, data }, '*')
}

function requestRarityData(el) {
  let tokenId = $(el).attr('data-token-id')
  //first time scan this token
  if (tokenId) {
    return
  }
  tokenId = $(el).find('a').attr("href").split('/').reverse()[0];
  const collectionName = document.querySelector('a[href^="/collection"]')?.href.split('/').reverse()[0].match(/[\w-]+/)[0]
  $(el).attr('data-token-id', tokenId)
  sendMessagetoPage('ext_content', { cmd: 'getRarityData', tokenId, collectionName })
}


function injectBuyNowButton(el) {
  if ($(el).find('.momane-buy-now-button').length === 0) {
    $(el).append(`<button class='btn btn-primary momane-buy-now-button'>
                Buy it now
              </button>`
    )
  }
}



function injectRarity(tokenId, ranking, score) {
  const rarityEl = $(`<span class="momane-rarity-badge">Ranking: ${ranking}</span>`)
  const rarityContainer = $(`<div class="momane-rarity-container"></div>`)
  rarityContainer.append(rarityEl)
  $(`article[data-token-id="${tokenId}"]`).append(rarityContainer)
}


function initBuyProcess(that) {
  that.text('...')
  that.addClass('disabled')
  const link = that.parent().find('a').attr('href')
  const assetAddress = link.match(/0x\w+/)[0]
  const assetId = link.match(/\/(\d+)/g)[1].replace('/', '')
  if (!seaport) {
    // const provider = new Web3.providers.HttpProvider(
    //   'https://mainnet.infura.io'
    // );
    seaport = new OpenSeaPort(window.web3.currentProvider, {
      networkName: Network.Main,
    })
  }
  seaport.api
    .getAsset({ tokenAddress: assetAddress, tokenId: assetId })
    .then(async (asset) => {
      const order = asset.sellOrders[0]
      try {
        await seaport.fulfillOrder({
          order,
          accountAddress: window.ethereum.selectedAddress,
        })
      } catch (e) {
        alert(e)
      } finally {
        that.text('Buy it now')
        that.removeClass('disabled')
      }
    }).catch(e => {
      alert(e)
    }).finally(() => {
      that.text('Buy it now')
      that.removeClass('disabled')
    })
}


// const provider = await detectEthereumProvider()

$('body').on('click', '.momane-buy-now-button', function (e) {
  e.preventDefault()
  let that = $(this)
  initBuyProcess(that)
})
