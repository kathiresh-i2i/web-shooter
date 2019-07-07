// chrome.runtime.onMessage.addListener(({ key }, sender, sendResponse) => {
//   console.log(sender.tab ?
//     "from a content script:" + sender.tab.url :
//     "from the extension");
//   if (key === 'networkHar') {
//     chrome.devtools.network.getHAR(harLog => {
//       sendResponse(JSON.stringify(harLog));
//     });
//   }
// });

const port = chrome.runtime.connect({ name: 'devTools' });
port.onMessage.addListener(({ key }) => {
  alert('From Devtools alert received', key);
  if (key === 'networkHar') {
    alert('From Devtools alert recei ved in network', key);
    chrome.devtools.network.getHAR(harLog => {
      alert(JSON.stringify(harLog));
      console.log('harLog - - - ', harLog);
      port.postMessage({ key: 'networkHar', message: harLog });
    });
  }
});
