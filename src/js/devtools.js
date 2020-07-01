const port = chrome.runtime.connect({ name: "devtools" });

const getNetworkLog = message => {
  chrome.devtools.network.getHAR(harLog => {
    port.postMessage({
      action: "setNetworkLog",
      source: "devtools",
      message: harLog
    });
  });
};

port.onMessage.addListener(message => {
  switch (message.action) {
    case "getNetworkHar":
      getNetworkLog(message);
      break;
    default:
      console.log("Unhandled message");
  }
});
