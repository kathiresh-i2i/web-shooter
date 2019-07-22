// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

const constants = {
  START_CONSOLE_RECORDING: "START_CONSOLE_RECORDING",
  STOP_CONSOLE_RECORDING: "STOP_CONSOLE_RECORDING"
};
let recordingVideoId = null;
let recordedVideoBlobs = [];
let stream = null;
let mediaRecorder = null;
const videoMimeType = "video/webm";
let ports = {};
let networkLog = null;
let tabId = null;
let recordingStartedTime = null;

function startRecording(id) {
  tabId = id;

  startScreenRecording(id);
  startConsoleRecording(id);
  // startNetworkRecording(id);
}

// VIDEO RECORDING START
const startScreenRecording = tabId => {
  recordingVideoId = chrome.desktopCapture.chooseDesktopMedia(
    ["screen"],
    onMediaSelected
  );
};

const onMediaSelected = id => {
  if (!id) {
    alert("Permission denied for recording");
  }
  recordingStartedTime = new Date();
  const options = {
    mandatory: {
      chromeMediaSource: "desktop",
      chromeMediaSourceId: id
    }
  };
  navigator.webkitGetUserMedia({
      audio: options,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: id,
          maxWidth: 1280,
          maxHeight: 720
        }
      }
    },
    onVideoStreamSuccess,
    onVideoStreamFailure
  );
};

const onVideoStreamSuccess = stream => {
  stream = stream;
  const options = {
    mimeType: videoMimeType
  };
  mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.onstop = () => {
    console.info("Recording has ended");
  };
  mediaRecorder.ondataavailable = event => {
    if (event.data && event.data.size > 0) {
      recordedVideoBlobs.push(event.data);
    }
  };
  // mediaRecorder.start(10); seperate chunks of 10 milliseconds
  mediaRecorder.start();

  // Stop sharing button handler
  stream.getVideoTracks()[0].onended = function () {
    console.info("Recording has ended");
    // stopVideoRecording();
    stopRecording();
  };
};

const onVideoStreamFailure = () => {
  console.log("onVideoStreamFailure ");
};

const stopVideoRecording = async () => {
  return new Promise((resolve, reject) => {
    if (recordingVideoId != null) {
      chrome.desktopCapture.cancelChooseDesktopMedia(recordingVideoId);
      recordingVideoId = null;
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      resolve();
    }
  });
};

const getVideoDataUrl = async () => {
  return new Promise((resolve, reject) => {
    if (recordedVideoBlobs.length > 0) {
      var superBuffer = new Blob(recordedVideoBlobs, {
        type: 'video/webm'
      });
      var reader = new window.FileReader();
      reader.readAsDataURL(superBuffer);
      reader.onloadend = function () {
        return resolve(reader.result);
      }
    } else {
      return reject(null);
    }
  });
};

async function stopRecording() {

  await stopVideoRecording();
  setTimeout(
    async () => {
      const networkLog = await stopNetworkRecording();
      const consoleLog = await stopConsoleRecording(tabId);
      const video = await getVideoDataUrl();
      var obj = {};
      networkLog.recordingStartedTime = recordingStartedTime;
      networkLog.entries = networkLog.entries.filter(entry => entry._resourceType === 'xhr');
      obj.networkLog = JSON.stringify(networkLog);
      obj.consoleLog = JSON.stringify(consoleLog);
      obj.video = video;
      obj.key = (new Date).getTime();
      obj.recordingStartedTime = recordingStartedTime;
      recordingStartedTime = null;
      console.log('obj', obj);
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          alert(obj.key);
          window.open(`http://localhost:3000/view/${obj.key}`, '_blank');
        }
      };
      xmlHttp.open("POST", ' https://23hq4whw41.execute-api.us-east-1.amazonaws.com/test'); // false for synchronous request
      xmlHttp.setRequestHeader("Content-type", "application/json");
      xmlHttp.send(JSON.stringify(obj));

    }, 2000);
}

// CONSOLE RECORDING START
const startConsoleRecording = tabId => {
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(
    tabId, {
      action: constants.START_CONSOLE_RECORDING
    },
    response => {
      console.log(response);
    }
  );
  // });
};

const stopConsoleRecording = async (tabId) => {
  return new Promise((res, rej) => {
    chrome.tabs.sendMessage(
      tabId, {
        action: constants.STOP_CONSOLE_RECORDING
      },
      response => {
        res(response);
      }
    );
  });
};

async function stopNetworkRecording() {
  ports["devtools"].postMessage({
    source: "background",
    action: "getNetworkHar"
  });
  return new Promise((resolve, reject) => {
    const networkLogListener = window.setInterval(() => {
      console.log("Checking if network is recevied");
      if (networkLog) {
        console.log("Network is received");
        resolve(networkLog);
        window.clearInterval(networkLogListener);
      }
    }, 100);
  });
};

const handleDevtoolsMessages = message => {
  switch (message.action) {
    case "setNetworkLog":
      console.log("Messages - - - - ", message);
      networkLog = message.message;
      break;
    default:
      console.log("Unhandled message");
  }
};

chrome.runtime.onConnect.addListener(port => {
  ports = {
    ...ports,
    [`${port.name}`]: port
  };
  port.onMessage.addListener(message => {
    switch (port.name) {
      case "devtools":
        handleDevtoolsMessages(message);
        break;
      default:
        console.log("Unhandled port connection");
    }
  });
});