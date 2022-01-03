import $ from 'jquery'


/**
 *
 * @param name string
 * @param url string
 */
const createAddCollectionPopup = (name, url) => {
	const addCollectionPopup = `<div class="owl-add-collection-pop">
		<div class="owl-add-collection-close">x</div>
		<div class="owl-add-collection-title">${name}</div>
		<div class="owl-add-collection-price">Price: 
		<input class="owl-add-collection-price-input"  type="number"/>eth</div>
		<button class="owl-add-collection-pop-button" data-name="${name}" data-url="${url}"> Monitor</button>
	</div>`

	return addCollectionPopup
}
/**
 *
 * @param name string
 * @param url string
 */
const createAddCollectionBtn = (name, url) => {
	return `
<button class="owl-add-collection" data-name="${name}" data-url="${url}"> Monitor </button>`
}


export const appendCollectionBtn = () => {
	const collectionLink = $('a.CollectionLink--link[href^="/collection/"]');
	if (collectionLink.length > 0) {
		const collection = collectionLink.eq(0)
		if (collection.next('.owl-add-collection').length > 0) {
			return
		}
		const name = collection.text()
		const url = collection.attr('href')
		const btn = createAddCollectionBtn(name, url)
		collection.after(btn)
	}
}


$('body').on("click", '.owl-add-collection', function () {
	const that = $(this)
	const name = that.data('name')
	const url = that.data('url')
	const popup = createAddCollectionPopup(name, url)
	$("body").append(popup)
}).on('click', '.owl-add-collection-pop-button', function () {
	const that = $(this)
	const name = that.data('name')
	let url = that.data('url')
	let collectionName = url.replace('/collection/', '').replace(/\//ig, '')
	url = 'https://opensea.io/collection/' + collectionName
	const price = that.parent().find('input').val().trim()
	if (!name || !url || !price) {
		alert("collection name, url, and price can not be empty")
		return
	}
	chrome.runtime.sendMessage({
		cmd: 'addCollection', data: {
			name: collectionName, url, price
		}
	})
	that.parent().remove()
}).on("click", '.owl-add-collection-close', function () {
	const that = $(this)
	that.parent().remove()
})


chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
	switch (req.cmd) {
		case 'collectionAdded':
			alert("collection added")
			break;
		case 'collectionNotAdded':
			alert("collection not added, please try again")
			break;
	}
})
