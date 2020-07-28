import * as angular from 'angular';


const runtimePort = chrome.runtime.connect({
  name: location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\r').join('')
});

runtimePort.onMessage.addListener(function (message) {
  if (!message || !message.myShooter2020) {
    return;
  }
});

export class PopupController {

  public static $inject: string[] = ['$http'];

  formData: any;

  constructor(private $http: angular.IHttpService) {

  }

  $onInit() {
    console.log('......POPUP CONTROLLER')


  }

  $onChanges(changes) {
    console.log('..POPUP CONTROLLER...onChanges>...', changes);
  }

  $doCheck() {
  }

  stopScreenRecord() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const { id: currentTabId } = tabs[0];
      chrome.extension.getBackgroundPage().stopRecording(true);
    });
    chrome.storage.local.set({ isRecording: false });
  }

  formSubmit(data) {
    console.log("..formSubmit....", data);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log('===tabs', tabs);

      const { id: currentTabId, url } = tabs[0];
      chrome.runtime.sendMessage({ action: "startStopwatch" });
      chrome.extension.getBackgroundPage().startRecording(currentTabId, data.fileName || 'Record Network', data.isEnableDataMask, url);
    });
    let timeRange = data.duration
    timeRange = timeRange < Number('15') ? 120 : Number(timeRange);
    chrome.storage.local.set({ isRecording: true, timerRange: timeRange });
    window.close();

  }
}




/**
 * https://github.com/toddmotto/angular-1-5-components-app/blob/master/src/app/components/contact/contact-detail/contact-detail.controller.js
 * https://github.com/toddmotto/angularjs-styleguide
 */