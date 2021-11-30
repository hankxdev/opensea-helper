import { Network, OpenSeaPort } from 'opensea-js'

import $ from 'jquery'
import detectEthereumProvider from '@metamask/detect-provider'

let seaport = null

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
}, 200)


// const provider = await detectEthereumProvider()

$('body').on('click', '.momane-buy-now-button', function (e) {
  e.preventDefault()
  let that = $(this);
  that.text('...')
  that.addClass('disabled')
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
})
