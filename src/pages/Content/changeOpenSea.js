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
		<button class="owl-add-collection-pop-button" data-url="${url}"> Track It</button>
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
<button class="owl-add-collection" data-name="${name}" data-url="${url}"> Track </button>`
}


export const appendCollectionBtn = () => {
	const collectionLink = $('a[href^="/collection/"]');
	if (collectionLink.length > 0) {
		const collection = collectionLink.eq(0)
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
	const url = that.data('url')
	const price = that.parent().find('input').val().trim()
	if (!name || !url || !price) {
		alert("collection name, url, and price can not be empty")
		return
	}
	chrome.runtime.sendMessage({
		cmd: 'addCollection', data: {
			name, url, price
		}
	})
	alert("Collection added, goto popup to check it")
}).on("click", '.owl-add-collection-close', function (){
	const that = $(this)
	that.parent().remove()
})

