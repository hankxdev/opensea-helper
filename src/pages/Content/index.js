import $ from 'jquery';
import { OpenSeaPort, Network } from 'opensea-js';
import * as Web3 from 'web3';

const buyNowButton = `
<button class="btn btn-primary momane-buy-now-button">
      Buy it now
</button>
`;

let seaport = null;

const config = {
  childList: true,
  subtree: true,
};

const targetNode = document.body;

const callback = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      const target = mutation.target;
      if (target && target.querySelector('.Image--image')) {
        let container = $(target).parents('article');
        if (container.length > 0) {
          if (container.find('.momane-buy-now-button').length === 0) {
            container.append(buyNowButton);
          }
        } else {
          let containers = $(target).find('article');
          if (containers.length > 0) {
            containers.each(function () {
              if ($(this).find('.momane-buy-now-button').length === 0) {
                $(this).append(buyNowButton);
              }
            });
          }
        }
      }
    }
  }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);

$('body').on('click', '.momane-buy-now-button', function (e) {
  e.preventDefault();
  const link = $(this).parent().find('a').attr('href');
  const assetAddress = link.match(/0x\w+/)[0];
  const assetId = link.match(/\/(\d+)/g)[1].replace('/', '');
  if (!seaport) {
    const provider = new Web3.providers.HttpProvider(
      'https://mainnet.infura.io'
    );
    seaport = new OpenSeaPort(provider, {
      networkName: Network.Main,
    });
  }
  seaport.api
    .getAsset({ tokenAddress: assetAddress, tokenId: assetId })
    .then(async (asset) => {
      const order = asset.sellOrders[0];
      await seaport.fulfillOrder({
        order,
        accountAddress: this.account,
      });
    });
});
