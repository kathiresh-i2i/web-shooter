import * as angular from 'angular';
import { StorageService } from './services/storage';


const runtimePort = chrome.runtime.connect({
  name: location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\r').join('')
});

runtimePort.onMessage.addListener(function (message) {
  if (!message || !message.myShooter2020) {
    return;
  }
});

export class PopupController {

  public static $inject: string[] = ['$http', 'StorageService'];

  formData: any;
  userInfo: any;

  constructor(private $http: angular.IHttpService,
    private storageService: StorageService) {

  }

  $onInit() {
    console.log('......POPUP CONTROLLER')
     
    this.storageService.getAll('users').then(res => {
      if(res) {
        this.userInfo = res[0];
        console.log('===res==', res);
      }
    });

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




// /**
//  * https://github.com/toddmotto/angular-1-5-components-app/blob/master/src/app/components/contact/contact-detail/contact-detail.controller.js
//  * https://github.com/toddmotto/angularjs-styleguide
//  */




// chrome-extension://cdhkdpajcpijhjfoankkbaaeaahfleho/preview/index.html?mp4=blob:chrome-extension://cdhkdpajcpijhjfoankkbaaeaahfleho/a3417924-46d5-458f-9188-294b609a2821&json=blob:chrome-extension://cdhkdpajcpijhjfoankkbaaeaahfleho/2d4aada6-0eff-4af1-aecd-8dd5712baffa&console=&browser=blob:chrome-extension://cdhkdpajcpijhjfoankkbaaeaahfleho/b5272fdf-0b2e-438b-8df7-8492363ce86c&name=Record%20Network

// https://web.mytharunika.com/#!#id_token=eyJraWQiOiJCVlVIR1ppYzRVMXpcL1dKOXFhQ3VsR3cwUHNha3FtbmNaaERtblNTNTJvTT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiOVhKQl9aU3F0SHVPM1EycW96X2tpZyIsInN1YiI6IjY0MjE5NDgxLTI3YTctNGQwOC1iMDdkLTM4NDM0YTU2Yzc4MSIsImF1ZCI6Ijc1OGYyb3FyOGg0b3NzaXA5Ymk0MThlZXYyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiYjFkNzgwOTYtNTZiMC00MGJiLTgyYTItMzU4NGU1NTI3OWRhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTcwNzE0NTIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2lUWXBtejFDYSIsImNvZ25pdG86dXNlcm5hbWUiOiI2NDIxOTQ4MS0yN2E3LTRkMDgtYjA3ZC0zODQzNGE1NmM3ODEiLCJleHAiOjE1OTcwNzUwNTIsImlhdCI6MTU5NzA3MTQ1MywiZW1haWwiOiJrYXRoaXJAZ21haWwuY29tIn0.ab9kJCyYsP0XV2SHtXphuGn7PcquLoKSj5yTUKRxyOEmcivoY8UOlvEdwuT2vo9kq1ESraMSSYy7YexKdExLZW7u8MS_RQZ1lTTjkL5y7o086w2IYtXE0YoiYZldkv2VFQ-ax_pHZjVgHS-ayZz2Qlah46rQ8w0NTxz92VoDyintT6MqoJGuU2sX8LLkeF9XHVeeyzGzB-8DXImxEhh6vN0AxrMmyQ8ZCQ1wv3Ekh-M279lqoDbu52l2nInqoayKrhzl1xC55nPgC0a1Ja9-CzZCsA49sNQ9XWP8UvuwtIQTNGsZucCdyuh1Zb4OPH3akf_A6MVtFRPur32eDFDDOA&access_token=eyJraWQiOiJXV3E2cVNyZmNMZmNUWGNiWFBGVVM3NDRDYXZBSWp3QUZXcnRtV3BcL0JuVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2NDIxOTQ4MS0yN2E3LTRkMDgtYjA3ZC0zODQzNGE1NmM3ODEiLCJldmVudF9pZCI6ImIxZDc4MDk2LTU2YjAtNDBiYi04MmEyLTM1ODRlNTUyNzlkYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIiwiYXV0aF90aW1lIjoxNTk3MDcxNDUyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9pVFlwbXoxQ2EiLCJleHAiOjE1OTcwNzUwNTIsImlhdCI6MTU5NzA3MTQ1MywidmVyc2lvbiI6MiwianRpIjoiMGQ1MDg5YTEtYTYyNi00M2RhLWJhYzUtNDg1YzM5NmJjODc3IiwiY2xpZW50X2lkIjoiNzU4ZjJvcXI4aDRvc3NpcDliaTQxOGVldjIiLCJ1c2VybmFtZSI6IjY0MjE5NDgxLTI3YTctNGQwOC1iMDdkLTM4NDM0YTU2Yzc4MSJ9.2VQrnH_wwF8F9i76CoM5k6EstP_UsWb3RlZTI2jpYV7yvGc6hprQ8zI6KB7PRtnhWlIVmHPBqWZdHS09tfWt4UMIIa1FBBOAJVtqOxsmgJnPQK2X3ng59lDO2TdXWJKA2IOrrDZCVdXQmDK6K9i9KVuXdGuokhebU5bPpBPXylrZDmFvMGqPkK68tVIHmXX3zYiZmwldgSaoM4zae-OtVT4_raApwODQMlJLz5q0v-ZAdDLc_Aqp0x2D7RtHTdXtLPlh_nFXMt2r4GL_u3oFbBsSnzS5V3g7vdmrOU0Dk6qLo1sacvNuH8TDqUtHZ5Touqtlp-dx7mlIK4SOdqR6qg&expires_in=3600&token_type=Bearer