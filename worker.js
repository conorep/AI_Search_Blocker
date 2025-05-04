"use strict";

const checkErr = () => {
  chrome.runtime.lastError && console.log(chrome.runtime.lastError);
}

const createOffscreen = () => {
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
