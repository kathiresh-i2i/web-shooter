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
  if (port.name === "devTools") {
    port.onMessage.addListener(message => {
      alert(`Message recevied in background ${JSON.stringify(message)}`);
      console.log(`Message recevied in background ${JSON.stringify(message)}`);
    });
  }
});

chrome.runtime.onMessage.addListener(({ key }, sender, sendResponse) => {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (key === "networkHar") {
    ports["devTools"] && ports["devTools"].postMessage({ key: "networkHar" });
    sendResponse("Message posted to devtools");
  }
  if (key === 'screenshot') {
    captureScreenShot();
  }
});

const captureScreenShot = () => {
  // captureDesktop(function (canvas) {
  //   screenshot.createBlob(canvas, function () {
  //       screenshot.createEditPage();
  //   });
  // });
  // chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], function(
  //   streamId
  // ) {
    // console.log('streamId - ', streamId);
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
      function(stream) {
        let video = document.createElement("video");
        video.addEventListener(
          "loadedmetadata",
          function() {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            ctx.drawImage(this, 0, 0);

            stream.getTracks()[0].stop();
            this.pause();
            this.remove();
            canvas.remove();
            // cb && cb(canvas);
            // createBlob(canvas, (patch, blob) => {
              const url = canvas.toDataURL("image/png");
              const a = document.createElement("a");
              document.body.appendChild(a);
              // const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = `image.png`;
              a.click();
              alert('downloaded');
            // });
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
      function(err) {
        console.log(err);
      }
    );
  // });
};

const createBlob = (canvas, callback) => {
  debugger
  console.log('canvas type ', typeof canvas);
  canvas.toBlob(
    function(blob) {
      let patch = (localStorage.filePatch = (
        window.URL || window.webkitURL
      ).createObjectURL(blob));
      if (callback) callback(patch, blob);
    },
    "image/" + (localStorage.format === "jpg" ? "jpeg" : "png"),
    localStorage.imageQuality / 100
  );
};
