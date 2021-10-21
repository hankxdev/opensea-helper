const contentScript = chrome.runtime.getURL('contentScript.bundle.js')

const script = document.createElement('script')
script.src = contentScript

document.head.appendChild(script);
