let allH1s = document.querySelectorAll('h1');
[...allH1s].every((h1Ele) => {
  if(h1Ele.innerHTML === 'AI Overview') {
    h1Ele.closest('div[data-hveid]').remove();
    return false;
  }
  return true;
})
