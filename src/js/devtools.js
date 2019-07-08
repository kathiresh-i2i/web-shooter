// const port = chrome.runtime.connect({ name: 'devtools' });

// port.onMessage.addListener(message => {

// });

// let ports = {};

// const getNetworkHar = (port) => {
//   // alert('somehsdbfihsdb');
//   chrome.devtools.network.getHAR(harLog => {
//     // alert(JSON.stringify(harLog));
//     console.log('harLog - - - ', harLog);
//     port.postMessage({ source: 'devtools', action: 'networkLog', message: harLog });
//   });
// }

// const handleBackgroundMessages = (port, message) => {
//   alert('Message form devtools');
//   switch(message.action) {
//     case 'getNetworkHar':
//       console.log('From network ');
//       getNetworkHar(port);
//       break;
//     default:
//       console.log('Unhandled message');
//   }
// }

const port = chrome.runtime.connect({ name: 'devtools' });

const getNetworkLog = (message) => {
  chrome.devtools.network.getHAR(harLog => {
    alert(`From devtools ${JSON.stringify(message)}`);
    port.postMessage({ action: 'setNetworkLog', source: 'devtools', message: harLog });
  });
}

port.onMessage.addListener(message => {
  switch(message.action) {
    case 'getNetworkHar':
      getNetworkLog(message);
      break;
    default:
      console.log('Unhandled message');
  }
});
