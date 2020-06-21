// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

const startRecordingBtn = document.getElementById("startRecordingBtn");

startRecordingBtn.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const { id: currentTabId } = tabs[0];
    var recordName = document.querySelector('input#recName').value;
    chrome.extension.getBackgroundPage().startRecording(currentTabId, recordName);
  });
};

const stopRecordingBtn = document.getElementById("stopRecordingBtn");

// stopRecordingBtn.onclick = () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     const { id: currentTabId } = tabs[0];
//     chrome.extension.getBackgroundPage().stopRecording(currentTabId);
//   });
// };
document.querySelector('.uploadBut').addEventListener('click', function () {

  chrome.windows.create(
    {
      url: 'display.html?uploadVideo=true', type: "popup", width: screen.width, height: screen.height
    });
});