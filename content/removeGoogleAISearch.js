(() => {
  if(window.location?.href.startsWith('https://www.google.com/search')) {
    const AIElementFlag = 'AI Overview';
    let killRecursion = false;

    const removeAIElements = () => {
      const allH1s = document.querySelectorAll('h1');
      let haveFoundEle = false;
      [...allH1s].every((h1Ele) => {
        if(h1Ele.innerHTML === AIElementFlag) {
          h1Ele.closest('div[data-hveid]').remove();
          haveFoundEle = true;
          return false;
        }
        return true;
      })
      if(!haveFoundEle) observeElementChanges();
    }

    const observeElementChanges = () => {
      let onMutationsObserved = function(mutations, thisObserver) {
        for(const mutation of mutations) {
          for(const aNode of mutation.addedNodes) {
            recurseThroughChildNodes(aNode, thisObserver);
          }
        }
      };
      const config = { childList: true, subtree: true };
      const observer = new MutationObserver(onMutationsObserved);
      observer.observe(document, config);
    }

    const recurseThroughChildNodes = (insertedNode, theObserver) => {
      if(killRecursion) return;

      if(insertedNode.nodeName === 'H1' && insertedNode.innerHTML === AIElementFlag) {
        insertedNode.closest('div[data-hveid]').remove();
        theObserver.disconnect();
        killRecursion = true;
        return;
      }

      if(insertedNode.childNodes?.length > 0) {
        for(const subNode of insertedNode.childNodes) {
          recurseThroughChildNodes(subNode, theObserver);
        }
      }
    }

    removeAIElements();
  }
})();
