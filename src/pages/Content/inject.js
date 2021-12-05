const defaultOptions = {
  changeUI: true,
  autoBuy: false,
  showNotifty: true,
}

chrome.storage.sync.get("options", i => {
  const options = i.options ? i.options : defaultOptions;
  injectBuyNowButtonScript(options);
})

const injectBuyNowButtonScript = options => {
  const contentScript = chrome.runtime.getURL('contentScript.bundle.js')

  const script = document.createElement('script')
  script.src = contentScript

  document.head.appendChild(script);

  script.onload = () => {
    window.postMessage({
      type: 'ext_options',
      options
    }, '*')
  }
}
