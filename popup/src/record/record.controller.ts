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
    this.recordOptions = {type : 'tab'};
        
    chrome.storage.sync.get('isRecording', function(obj) {
     this.isRecording = obj.isRecording === 'true';
     console.log("............ this.isRecording..", this.isRecording)

 });
   }

  $onChanges(changes) {      
    console.log('..RECORD CONTROLLER..onChanges>...', changes);
   }

  $doCheck() {
    console.log(this.isRecording,"..RECORD CONTROLLER.doCHECK....");
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
 