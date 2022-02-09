import { Network, OpenSeaPort } from 'opensea-js'

import $ from 'jquery'

let seaport = null

let option = {
  changeUI: true,
  autoBuy: false,
  showNotify: true,
  cartIcon: ''
}

let lastURL = window.location.href
let lastTokens = []

let userInfo = {
  token: '',
  address: '',
  isPaidUser: false,
}

let collectionInfos = {}

const memeberButton = `
<div title="Purchase to unlock" class="owl-memebr-btn memberlock smallButton">
<i color="gray" size="16" value="" class=" material-icons">lock</i>  Member
</div>
`



window.addEventListener('message', e => {
  if (e.data.type === 'ext_options') {
    const { options, user } = e.data
    option = options
    userInfo = user
    const { changeUI } = option
    changeOpenseaUI(changeUI)
  } else if (e.data.type === 'setRarityData') {
    const { rarityData } = e.data
    console.log(e.data.rarityData)
    injectRarity(rarityData.token_id, rarityData.ranking, rarityData.score)
  }
})

function changeOpenseaUI(changeUI) {
  if (!changeUI) {
    return
  }
  const changeUIInterval = setInterval(() => {
    const url = window.location.href
    if (url !== lastURL) {
      lastURL = url
      lastTokens = []
    }
    //activity page
    if (url.includes('tab=activity')) {
      const tokenEls = $('div[role="listitem"]')
      tokenEls.each((_, el) => {
        injectBuyNowButtonOnActivityPage(el)
        requestRarityData(el)
      })
    } else if (url.includes('/assets/')) {
      const tokenButtonEl = $('article')
      if (tokenButtonEl.length < 1) {
        return
      }
      tokenButtonEl.each((_, el) => {
        const $el = $(el)
        let tokenId = ''
        if ($el.find("a").length < 1) {
          tokenId = url.split('/').reverse()[0]
        } else {
          tokenId = $el.find("a").attr('href')?.split('/').reverse()[0]
        }
        injectBuyNowButton($el, tokenId)
      })


    } else {
      const tokenEls = $('article')
      tokenEls.each((_, el) => {
        const tokenId = $(el).find("a").attr('href')?.split('/').reverse()[0]
        injectBuyNowButton(el, tokenId)
        requestRarityData(el)
      })
    }

  }, 100)
  return changeUIInterval
}


function injectBuyNowButtonOnActivityPage(el) {
  if ($(el).find('.owl-buy-now-button-small').length === 0) {
    $(el).find('div[class^=\'AssetCellreact\']')
      .parent()
      .after(`<button class='btn btn-primary owl-buy-now-button-small'>
                Buy now
              </button>`,
      )
  }
}


function sendMessagetoPage(type, data) {
  window.postMessage({ type, data }, '*')
}

function requestRarityData(el) {
  const $el = $(el)
  if(!userInfo.isPaidUser){
    const owlBar= $el.parent().find('.owl-buy-now-button')
    const rankBar = owlBar.find('.owl-rank')
    if(rankBar.find('.owl-memebr-btn').length < 1){
      rankBar.append(memeberButton)
    }
    return
  }
  let tokenId = $el.attr('data-token-id')
  //first time scan this token
  if (tokenId) {
    return
  }

  tokenId = $el.find('a').attr('href')?.split('/').reverse()[0]

  if (!tokenId) {
    return
  }
  const rarityEl = $(`div.owl-rarity-container[data-rarity-id="${tokenId}"]`)

  if (rarityEl.length > 0) {
    if ($('article').length < 1) {
      // activity page
      $(`div[role="listitem"][data-token-id="${tokenId}"]`).find('div[class^=\'AssetCellreact\']').parent().after(rarityEl)
    }
  }
  $el.attr('data-token-id', tokenId)
  const collectionName = document.querySelector('a[href^="/collection"]')?.href.split('/').reverse()[0].match(/[\w-]+/)[0]
  if (lastTokens.includes(tokenId)) {
    return
  }
  lastTokens.push(tokenId)
  sendMessagetoPage('ext_content', { cmd: 'getRarityData', tokenId, collectionName })
}


function buttonHtml(tokenId) {
  return `
  <div class="owl-buy-now-button" data-cate-id="${getCollectionName()}" data-token-id="${tokenId}">
    <div class="owl-buy-now-button-inner">
      <div class="owl-left">
        <div class="owl-dots">...</div>
        <div class="owl-rank">Rank: <span class="owl-rank-value"></span></div>
        <div class="owl-floor">Floor: <span class="owl-floor-value"></span></div>
      </div>
        <div class="owl-right">
          <div class="owl-buy-now"><img src="${option.cartIcon}"/></div>
        </div>
    </div>
  </div>
  `
}


function getCollectionName() {
  return document.querySelector('a[href^="/collection"]')?.href.split('/').reverse()[0].match(/[\w-]+/)[0]
}


function injectBuyNowButton(el, tokenId) {
  if ($(el).find('.owl-buy-now-button').length > 0) {
    return
  }
  $(el).append(buttonHtml(tokenId))
  getFloorPrice().then(floorPrice => {
    $(".owl-floor-value").text(floorPrice)
  })
}

function getFloorPrice() {
  const name = getCollectionName()
  return new Promise((resolve, reject) => {
    if (collectionInfos[name]) {
      resolve(collectionInfos[name].floorPrice)
    } else {
      $.ajax({
        url: `https://api.opensea.io/api/v1/collection/${name}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          collectionInfos[name] = { floorPrice: data.collection.stats.floor_price }
          resolve(collectionInfos[name].floorPrice)
        }
      })
    }
  })
}


function injectRarity(tokenId, ranking, score) {
  const rarityEl = $(`<span class='owl-rarity-badge'>Rarity # ${ranking}</span>`)
  const rarityContainer = $(`<div class='owl-rarity-container' data-rarity-id='${tokenId}'></div>`)
  rarityContainer.append(rarityEl)
  if ($('article').length < 1) {
    // activity page
    rarityEl.text(`#${ranking}`)
    rarityContainer.addClass('owl-rarity-container-activity')
    const tokenListItem = $(`div[role="listitem"][data-token-id="${tokenId}"]`)
    if (tokenListItem.find('.owl-rarity-container').length === 0) {
      tokenListItem.find('div[class^=\'AssetCellreact\']').parent().after(rarityContainer)
    }
  } else {
    $(`article[data-token-id="${tokenId}"]`).find(".owl-rank-value").text(`#${ranking}`)
  }
}


function initBuyProcess(el) {
  const that = $(el)
  if (that.hasClass('disabled')) {
    alert('buy process is running')
    return
  }
  that.find('.owl-buy-now').addClass('disabled spin-cart')
  let assetAddress = ''
  let assetId = that.data('token-id')
  if (window.location.href.includes('/assets/')) {
    assetAddress = window.location.href.split('/').reverse()[1]
  } else {
    const link = that.parent().find('a').attr('href')
    assetAddress = link.match(/0x\w+/)[0]
  }
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
        that.find('.owl-buy-now').removeClass('disabled spin-cart')
      }
    }).catch(e => {
      alert(e)
    }).finally(() => {
      that.find('.owl-buy-now').removeClass('disabled spin-cart')
    })
}


// const provider = await detectEthereumProvider()

$('body').on('click', '.owl-buy-now-button, .owl-buy-now-button-small', function (e) {
  e.preventDefault()
  if(!userInfo.isPaidUser){
    alert('You need to be a paid user to buy tokens')
    return
  }
  let that = $(this)
  initBuyProcess(that)
}).on("click", ".owl-memebr-btn", function (e){
  e.preventDefault()
  e.stopPropagation()
  window.open("https://niftyowl.io", "_blank")
})
