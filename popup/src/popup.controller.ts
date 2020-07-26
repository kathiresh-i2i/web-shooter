import * as angular from 'angular';


const runtimePort = chrome.runtime.connect({
  name: location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\r').join('')
});

runtimePort.onMessage.addListener(function(message) {
  if (!message || !message.myShooter2020) {
      return;
  }
});

 export class PopupController {

  public static $inject: string[] = ['$http'];

  formData:any;

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

  stopScreenRecord(){
    chrome.storage.sync.set({
      isRecording: 'false'
  }, function() {
      runtimePort.postMessage({
          myShooter2020: true,
          stopRecording: true,
          popupjs:true
      });
      window.close();
  });
  }

  formSubmit(data){
       chrome.storage.sync.set({
        enableTabCaptureAPI: 'true',
        enableTabCaptureAPIAudioOnly: 'false',
        enableMicrophone: `${data.isMicEnabled}` || 'false',
        enableCamera: `${data.isCamEnabled}` || 'false',
        enableScreen: 'false',
        isRecording: 'true',
        enableSpeakers: 'false'
    }, function() {
        runtimePort.postMessage({
             myShooter2020: true,
             startRecording: true,
             popupjs:true
        });
        window.close();
    });
   }

}
 



/**
 * https://github.com/toddmotto/angular-1-5-components-app/blob/master/src/app/components/contact/contact-detail/contact-detail.controller.js
 * https://github.com/toddmotto/angularjs-styleguide
 */