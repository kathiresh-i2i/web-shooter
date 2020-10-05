import * as angular from 'angular';

 export class RecordController {

  public static $inject: string[] = ['$http', '$window'];
  recordOptions:any;
  submitData:any;
  stopRecording:any;
  isRecording: boolean;

  constructor(private $http: angular.IHttpService, private $window: angular.IWindowService) {
    'ngInject';
  }
  
  $onInit() {
    console.log('......RECORD CONTROLLER');

    chrome.storage.local.get("isRecording", (obj)=>{
      this.isRecording = obj.isRecording;

      if(obj.isRecording){      
        chrome.storage.local.get("name", (obj)=>{
          this.recordOptions.fileName = obj.name;
        })
        chrome.storage.local.get("duration", (obj)=>{
          this.recordOptions.duration = obj.duration;
        })
        chrome.storage.local.get("isEnableDataMask", (obj)=>{
          this.recordOptions.isEnableDataMask = obj.isEnableDataMask;
        })
      }
    });  
    this.recordOptions = {
      type : 'tab',
      fileName: 'Record Network'
    };
   }

  $onChanges(changes) {      
    console.log('..RECORD CONTROLLER..onChanges>...', changes);
  }
  
  $doCheck() {
    console.log(this.isRecording,"..RECORD CONTROLLER.doCHECK....");
    chrome.storage.local.get('isRecording', function (obj) {
      const _self = this;
     if (obj.isRecording) {
     console.log("...AAAAAAA>..",obj);
     _self.isRecording = obj.isRecording;

     }
   });
  }
  
  selectRecordtype(type){
    this.recordOptions.type = type;
  }

  stopRecord(){
   this.isRecording=false;
   chrome.storage.local.set({ isRecording: false });   
   chrome.storage.local.set({ name: 'Record Network'});
   chrome.storage.local.set({ duration: 90});
   chrome.storage.local.set({ isEnableDataMask: false });
   this.stopRecording();
  }

  startRecord(){
      this.isRecording=true;
      chrome.storage.local.set({ isRecording: true});
      chrome.storage.local.set({ name: this.recordOptions.fileName});
      chrome.storage.local.set({ duration: this.recordOptions.duration});
      chrome.storage.local.set({ isEnableDataMask: this.recordOptions.isEnableDataMask});
      this.submitData({recordOptions : this.recordOptions});
  }
  moveToUpload(){
    let url = './../preview/index.html'
    this.$window.open(url, '_blank');
  }

}
 