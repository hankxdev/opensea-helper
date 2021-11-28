import { Network, OpenSeaPort } from 'opensea-js'

import $ from 'jquery'
import detectEthereumProvider from '@metamask/detect-provider'

let seaport = null


const callback = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      const target = mutation.target
      if (target && target.querySelector('.Image--image')) {
        let container = $(target).parents('article')
        if (container.length > 0) {
          if (container.find('.momane-buy-now-button').length === 0) {
            buyNowButton.attr("data-astId",)
            buyNowButton.attr("data-astAddr",)
            container.append(buyNowButton)
          }
        } else {
          let containers = $(target).find('article')
          if (containers.length > 0) {
            containers.each(function () {
              if ($(this).find('.momane-buy-now-button').length === 0) {
                $(this).append(buyNowButton)
              }
            })
          }
        }
      }
    }
  }
}



setInterval(() => {
  const tokenEls = $("article")
  tokenEls.each((_, el) => {
    if ($(el).find('.momane-buy-now-button').length === 0) {
      $(el).append(`<button class='btn btn-primary momane-buy-now-button'>
                    Buy it now
                  </button>`
      )
    }
  })
}, 300)


// const provider = await detectEthereumProvider()

$('body').on('click', '.momane-buy-now-button', function (e) {
  e.preventDefault()
  const link = $(this).parent().find('a').attr('href')
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
      }
    }).catch(e => {
      alert(e)
    })
})
