// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

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
let networkLog = {};

const handlePopupMessages = message => {
  switch(message.action) {
    case 'reportWithScreenShot':
      reportWithScreenShot();
      break;
    default:
      console.log('Unhandled message');
  }
}

const handleDevtoolsMessages = message => {
  switch(message.action) {
    case 'setNetworkLog':
      console.log('Messages - - - - ', message);
      networkLog = message.message;
      break;
    default:
      console.log('Unhandled message');
  }
}

const getNetworkHar = () => {
  ports['devtools'].postMessage({ source: 'background', action: 'getNetworkHar' });
}

const getScreenshotBlob = () => {
  console.log('getScreenshotBlob');
  chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], function (
    streamId
  ) {
    window.navigator.webkitGetUserMedia(
      {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: streamId,
            maxWidth: 4000,
            maxHeight: 4000
          }
        }
      },
      function (stream) {
        console.log('sdcksudbckisbdjcbksd');
        let video = document.createElement("video");
        video.addEventListener(
          "loadedmetadata",
          function () {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            ctx.drawImage(this, 0, 0);

            stream.getTracks()[0].stop();
            this.pause();
            this.remove();
            canvas.remove();
            const url = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = `image.png`;
            a.click();
            alert('downloaded');
          },
          false
        );
        try {
          video.srcObject = stream;
        } catch (error) {
          video.src = window.URL.createObjectURL(stream);
        }
        video.play();
      },
      function (err) {
        console.log(err);
      }
    );
  });
}

const getConsoleLogs = (cb) => {
  chrome.runtime.sendMessage({ source: 'background', action: 'getConsoleLog' }, response => {
    console.log('response - - - -- ', response);
  });
}

const reportWithScreenShot = () => {
  getNetworkHar();
  getScreenshotBlob();
  getConsoleLogs(consoleLogs => {
    console.log('consoleLogs - - - ', consoleLogs);
  });
}

chrome.runtime.onConnect.addListener(port => {
  ports = { ...ports, [`${port.name}`]: port };
  port.onMessage.addListener(message => {
    switch(port.name) {
      case 'popup':
        handlePopupMessages(message);        
        break;
      case 'devtools':
        handleDevtoolsMessages(message);
        break;
      default: 
        console.log('Unhandled port connection');
    }
  });
});
