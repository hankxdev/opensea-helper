const head = document.head

const contentScript = chrome.extension.getURL('contentScript.bundle.js')

const script = document.createElement('script')
script.src = contentScript

document.head.appendChild(script);
