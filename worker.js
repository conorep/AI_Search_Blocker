"use strict";

const checkErr = () => {
  chrome.runtime.lastError && console.log(chrome.runtime.lastError);
}

chrome.webNavigation.onCompleted.addListener((info) => {
  if(info?.url?.startsWith('https://www.google.com/search')) {
    chrome.scripting.executeScript({
      target: { tabId: info.tabId },
      files: [ 'content/removeGoogleAISearch.js' ]
    }, checkErr)
  }
})

function createOffscreen() {
  chrome.runtime.getContexts({ contextTypes: [ 'OFFSCREEN_DOCUMENT' ] }, (contexts) => {
    if(!contexts || contexts?.length > 0) { return; }
    chrome.offscreen.createDocument({
      url: './html/offscreen.html',
      reasons: ['BLOBS'],
      justification: 'keep service worker running',
    }, checkErr)
  })
}
self.onmessage = () => {};
createOffscreen();
