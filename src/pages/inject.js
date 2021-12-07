const defaultOptions = {
  changeUI: true,
  autoBuy: false,
  showNotifty: true,
}

chrome.storage.sync.get("options", i => {
  const options = i.options ? i.options : defaultOptions;
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
})
