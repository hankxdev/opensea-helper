import {CMD_NAME} from '../../consts'
import {appendCollectionBtn} from './changeOpenSea'
import {checkToken} from '../../utils'

const defaultOptions = {
	changeUI: true,
	autoBuy: false,
	showNotifty: true,
}

chrome.storage.sync.get(["options", 'user'], i => {
	const user = i.user
	if (!user) {
		return
	}
	const {address, token} = user
	// if (!checkToken(address, token)) {
	// 	return
	// }
	user.isPaidUser = checkToken(address, token)
	setInterval(()=>{
		appendCollectionBtn()
	}, 500)
	const options = i.options ? i.options : defaultOptions;
	injectBuyNowButtonScript(options, user);
})

const injectBuyNowButtonScript = (options, user) => {
	const contentScript = chrome.runtime.getURL('contentScript.bundle.js')
  options.cartIcon = chrome.runtime.getURL('img/cart.svg')
	const script = document.createElement('script')
	script.src = contentScript
	document.head.appendChild(script);
	script.onload = () => {
		window.postMessage({
			type: 'ext_options',
			options,
			user
		}, '*')
	}
}


window.addEventListener('message', function (event) {
	switch (event.data.type) {
		case 'ext_content':
			executeContentScriptCommand(event.data.data.cmd, event.data.data)
			break;
	}
})

function executeContentScriptCommand(cmd, data) {
	switch (cmd) {
		case 'getRarityData':
			chrome.runtime.sendMessage({
				cmd: CMD_NAME.GET_TOKEN_RARITY,
				data
			})
			break;
	}
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	switch (request.cmd) {
		case CMD_NAME.SET_TOKEN_RARITY:
			window.postMessage({
				type: 'setRarityData',
				rarityData: request.data
			}, '*')
			break;
	}
})
