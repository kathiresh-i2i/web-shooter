// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

const startRecordingBtn = document.getElementById("startRecordingBtn");

startRecordingBtn.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log('===tabs', tabs);
    
    const { id: currentTabId, url } = tabs[0];
    var recordName = document.querySelector('input#recName').value;
    var cb = document.getElementById('isEnableDataMask');
    console.log(".......MASK ENABLED.....",cb.checked);
    chrome.runtime.sendMessage({action: "startStopwatch"});
    chrome.extension.getBackgroundPage().startRecording(currentTabId, recordName, cb.checked, url);
  });
  let timeRange = document.getElementById("myRange").value;
  timeRange = timeRange < Number('15') ? 120 : Number(timeRange);
  chrome.storage.local.set({ isRecording: true, timerRange: timeRange  });
  startRecordingBtn.classList.add('hidebutton');
  window.close();
};

const stop = document.getElementById("stop");

document.querySelector('.uploadBut').addEventListener('click', function () {

  chrome.windows.create(
    {
      url: 'display.html?uploadVideo=true', type: "popup", width: screen.width, height: screen.height
    });
});

stop.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const { id: currentTabId } = tabs[0];
    chrome.extension.getBackgroundPage().stopRecording(true);
  });
  stop.classList.add('hidebutton');
  startRecordingBtn.classList.remove("hidebutton");
  chrome.storage.local.set({ isRecording: false });
};

chrome.storage.local.get('isRecording', (data) => {
  if (data.isRecording) {
    startRecordingBtn.classList.add('hidebutton');
    stop.classList.remove("hidebutton");
  }
});

$(document).ready(function(){
  $("#result b").html($("#myRange").val());
  $("#myRange").change(function(){
    $("#result b").html($(this).val());
  });
});
