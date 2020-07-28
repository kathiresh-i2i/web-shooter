import * as angular from 'angular';

 export class RecordController {

  public static $inject: string[] = ['$http'];
  recordOptions:any;
  submitData:any;
  stopRecording:any;
  isRecording: boolean;

  constructor(private $http: angular.IHttpService) {
    'ngInject';
  }

  $onInit() {
    console.log('......RECORD CONTROLLER')
    this.isRecording= false;
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
   this.stopRecording();
  }

  startRecord(){
      this.isRecording=true;
      this.submitData({recordOptions : this.recordOptions});

  }

}
 