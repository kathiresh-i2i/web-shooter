// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

function WebRequest() { };
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
var req = new Map();
var startTime = 0;

var requests = [];
var requestsMap = {};
var pages = {};
var loading = false;
var intervalId;
var iconIndex = 0;
var customName = 'web_shooter';

function startRecording(id) {
  tabId = id;

  startScreenRecording(id);
  startConsoleRecording(id);
  startNetworkRecording(id);
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

function updateIcon() {
  var iconName = loading ?
    './assets/images/cloud-upload64-' + ((iconIndex % 2) + 1) + '.png' : './assets/images/bug16.png';
  chrome.browserAction.setIcon({ path: iconName });
}



function convertMapToObject(map_var) {
  var objectlist = [];
  map_var.forEach(function (i, k) {
    console.log(k);
    //var temp=new RequestObj();
    //RequestObj.requestid=k;
    //RequestObj.webReq=i;
    objectlist.push({ 'requestid': k, 'webReq': i });
  });
  return objectlist;
}

function launchPreview(videoURL, jsonURL) {
  chrome.windows.create(
    {
      url: 'display.html?mp4=' + videoURL + '&json=' + jsonURL + '&customname=' + encodeURIComponent(customName), type: "popup", width: screen.width, height: screen.height
    });
}


async function stopRecording() {


  // saveToLocalStorage();


  // intervalId = setInterval(function() {
  //   iconIndex++;
  //   updateIcon();
  // }, 500);
  setTimeout(
    async () => {
      const networkLog = await stopNetworkRecording();
      console.log('====networkLog', networkLog);

      const consoleLog = await stopConsoleRecording(tabId);
      const video = await getVideoDataUrl();

      await stopVideoRecording();
      loading = true;

      //var superBuffer = new Blob(recordedBlobs, {type: 'video/mpeg'});
      var superBuffer = new Blob(recordedVideoBlobs, { type: 'video/webm' });
      var recordedobjectURL = window.URL.createObjectURL(superBuffer);
      console.log('=====req', req);
      
      var recorded_json = JSON.stringify(convertMapToObject(getRequestByTypes(req)));
      console.log('=====recorded_json', recorded_json);

      var blob = new Blob([recorded_json], { type: "application/json" });
      var recordedJsonURL = window.URL.createObjectURL(blob);
      launchPreview(recordedobjectURL, recordedJsonURL);
      // Commented as of now for local preview
      // saveToLocalStorage();
      // var obj = {};
      // networkLog.recordingStartedTime = recordingStartedTime;
      // obj.networkLog = JSON.stringify(networkLog);
      // obj.consoleLog = JSON.stringify(consoleLog);
      // obj.video = video;
      // obj.key = (new Date).getTime();
      // obj.recordingStartedTime = recordingStartedTime;
      // recordingStartedTime = null;
      // console.log('obj', obj);
      // var xmlHttp = new XMLHttpRequest();
      // xmlHttp.onreadystatechange = function () {
      //   if (this.readyState == 4 && this.status == 200) {
      //     loading = false;
      //     updateIcon();
      //     clearInterval(intervalId)
      //     alert(obj.key);
      //     window.open(`http://web-shooter-preview.s3-website-us-east-1.amazonaws.com/view/${obj.key}`, '_blank');
      //   }
      // };
      // xmlHttp.open("POST", ' http://ec2-3-95-132-124.compute-1.amazonaws.com:3000/upload'); // false for synchronous request
      // xmlHttp.setRequestHeader("Content-type", "application/json");
      // xmlHttp.send(JSON.stringify(obj));

    }, 2000);
}

function getRequestByTypes() {
  // var filteredReq = requests.filter(obj => obj.type === 'XHR');
  // console.log('==filteredReq===', filteredReq);
  
  // return filteredReq;
  var acceptedTypes = ['XHR']
  req.forEach((value, key, set) => {
    if(value.type && acceptedTypes.indexOf(value.type) === -1){
      set.delete(key);
    }
  });
  return req;
}

function saveToLocalStorage() {
  //var superBuffer = new Blob(recordedBlobs, {type: 'video/mpeg'});
  var superBuffer = new Blob(recordedVideoBlobs, { type: 'video/webm' });
  var reader = new window.FileReader();
  reader.readAsDataURL(superBuffer);
  reader.onloadend = function () {
    var base64data = reader.result;
    //console.log(base64data );
    function videoObj() { };
    var vidObj = new videoObj();
    vidObj.video = base64data;
    //vidObj.abc='test';
    var recorded_json = JSON.stringify(convertMapToObject(req));
    vidObj.json = recorded_json;
    vidObj.friendlyName = customName;

    var tempmap = {};
    tempmap[videoName] = vidObj;
    chrome.storage.local.set(tempmap, function () {
      // Notify that we saved.
      console.log('video Saved saved');
    });
  }

}

function gatherEverything() {
  //var superBuffer = new Blob(recordedBlobs, {type: 'video/mpeg'});
  console.log(recordedBlobs);
  var superBuffer = new Blob(recordedBlobs, { type: 'video/webm' });
  var recordedobjectURL = window.URL.createObjectURL(superBuffer);
  var recorded_json = JSON.stringify(convertMapToObject(req));
  var blob = new Blob([recorded_json], { type: "application/json" });
  var recordedJsonURL = window.URL.createObjectURL(blob);
  launchPreview(recordedobjectURL, recordedJsonURL);
  // saveToLocalStorage();
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
  // ports["devtools"].postMessage({
  //   source: "background",
  //   action: "getNetworkHar"
  // });
  // return new Promise((resolve, reject) => {
  //   const networkLogListener = window.setInterval(() => {
  //     if (networkLog) {
  //       resolve(networkLog);
  //       window.clearInterval(networkLogListener);
  //     }
  //   }, 100);
  // });
  chrome.debugger.detach({ tabId: tabId });
  requestsMap = {};
  var body = {
    entries: requests.filter(obj => obj.type === 'XHR'),
    pages: Object.keys(pages)
  };
  requests = [];
  pages = {};
  return body;
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

function startNetworkRecording(tabid) {
  chrome.debugger.attach({ //debug at current tab
    tabId: tabid
  }, "1.0", onAttach.bind(null, tabid));
}

function onAttach(tabId) {
  startTime = new Date().valueOf();
  chrome.debugger.sendCommand({
    tabId: tabId
  }, "Network.enable");
  chrome.debugger.sendCommand({
    tabId: tabId
  }, "Network.clearBrowserCache");
  chrome.debugger.onEvent.addListener(allEventHandler);
  // addEventListenters(tabId);
}

function addWebReq(details) {
  if (!req.get(details.requestId)) {
    var temp = new WebRequest();
    if (details.requestBody) temp.requestBody = details.requestBody;
    if (details.method) temp.method = details.method;
    if (details.url) temp.url = details.url;
    temp.requesttime = (new Date().valueOf() - startTime) / 1000;
    if (details.responseHeaders) temp.responseHeaders = details.responseHeaders;
    if (details.statusCode) temp.statusCode = details.statusCode;
    if (details.statusLine) temp.statusLine = details.statusLine;
    temp.responseBody = [{ 'www': 'eee' }]
    req.set(details.requestId, temp);
  }
  else {
    if (details.requestBody)
      req.get(details.requestId).requestBody = details.requestBody;
    if (details.requestHeaders)
      req.get(details.requestId).requestHeaders = details.requestHeaders;
    if (details.responseHeaders)
      req.get(details.requestId).responseHeaders = details.responseHeaders;
    if (details.statusCode) {
      req.get(details.requestId).statusCode = details.statusCode;
      req.get(details.requestId).responseTime = (new Date().valueOf() - startTime) / 1000;
    }
    if (details.statusLine)
      req.get(details.requestId).statusLine = details.statusLine;
    req.get(details.requestId).responseBody = [{ 'rrrr': 'ffff' }]
  }
};


function addEventListenters(tabid) {
  startTime = new Date().valueOf();

  chrome.webRequest.onBeforeRequest.addListener(addWebReq,
    {
      urls: ["<all_urls>"],
      tabId: tabid,
      types: ["main_frame", "sub_frame", "xmlhttprequest"]
    }
    ,
    ['requestBody']
  );
  chrome.webRequest.onBeforeSendHeaders.addListener(addWebReq,
    {
      urls: ["<all_urls>"],
      tabId: tabid,
      types: ["main_frame", "sub_frame", "xmlhttprequest"]

    }
    ,
    ['requestHeaders']
  );
  chrome.webRequest.onHeadersReceived.addListener(addWebReq,
    {
      urls: ["<all_urls>"],
      tabId: tabid,
      types: ["main_frame", "sub_frame", "xmlhttprequest"]
    }
    ,
    ['responseHeaders']
  );
  chrome.webRequest.onHeadersReceived.addListener(addWebReq,
    {
      urls: ["<all_urls>"],
      tabId: tabid,
      types: ["main_frame", "sub_frame", "xmlhttprequest"]
    }
    ,
    ['responseBody']
  );
}

function allEventHandler(debuggeeId, message, params) {
  console.log('=====opppp=', params);

  var networkJson;
  if (!req.get(params.requestId)) {
    networkJson = new WebRequest();
  } else {
    networkJson = req.get(params.requestId);
  }

  switch (message) {
    case "Network.responseReceived":
      if (params.response.headers)
        req.get(params.requestId).responseHeaders = formatHeaders(params.response.headers);
      if (params.request)
        req.get(params.requestId).requestHeaders = formatHeaders(params.request.headers);
      if (params.response.status) {
        req.get(params.requestId).statusCode = params.response.status;
        req.get(params.requestId).responseTime = (new Date().valueOf() - startTime) / 1000;
        req.get(params.requestId).statusLine = params.response.status;
      }
      if (params.type)
        req.get(params.requestId).type = params.type;
      break;
    case "Network.requestWillBeSent":
      if (params.request)
        networkJson.method = params.request.method;
      if (params.documentURL) networkJson.url = params.request.url;
      networkJson.requesttime = (new Date().valueOf() - startTime) / 1000;
      if (params.request) networkJson.requestHeaders = formatHeaders(params.request.headers);
      req.set(params.requestId, networkJson);
      if (params.type)
        req.get(params.requestId).type = params.type;
      break;
    case "Network.dataReceived":
      break;
    case "Network.loadingFinished":
      chrome.debugger.sendCommand({
        tabId: debuggeeId.tabId
      }, "Network.getResponseBody", {
        "requestId": params.requestId
      }, function (response) {
        if (response) {
          req.get(params.requestId).responseBody = response.body;
        }
      });
      break;
  }
}

function formatHeaders(headers) {
  var headerList = [];
  var headerJson = {};
  Object.keys(headers).forEach(function (key) {
    headerJson = {};
    headerJson.name = key;
    headerJson.value = headers[key];
    headerList.push(headerJson);
  });
  return headerList;
}