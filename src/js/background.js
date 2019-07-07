// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// 'use strict';

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'developer.chrome.com'},
//       })],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });

let ports = {};
chrome.runtime.onConnect.addListener(port => {
  ports = { ...ports, ...{ [port.name]: port } };
  if (port.name === 'devTools') {
    port.onMessage.addListener(message => {
      alert(`Message recevied in background ${JSON.stringify(message)}`);
      console.log(`Message recevied in background ${JSON.stringify(message)}`);    
    });
  }
});

chrome.runtime.onMessage.addListener(({ key }, sender, sendResponse) => {
  console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");
  if (key === 'networkHar') {
    ports['devTools'] && ports['devTools'].postMessage({ key: 'networkHar' });
    sendResponse('Message posted to devtools');
  }
});