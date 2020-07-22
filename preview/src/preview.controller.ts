import * as ebml from 'ts-ebml';
import angular = require('angular');


export class PreviewCotroller {

  public static $inject: string[] = ['$http'];

  file: File;
  videoSrc: any;
  networkList:any;
  playTime:any;
  private decoder: any;
  private dec:any;
  private req:any;

  constructor(private $http: angular.IHttpService) {
    this.decoder = new ebml.Decoder()
    this.dec = new TextDecoder("utf-8");
  }

  $onInit() {
  }

  $onChanges(changes){
   console.log('....onChanges>...', changes);
  }

  $doCheck(){
    console.log("...doCHECK....",this.playTime);
  }

  onFileChange() {
    console.log(this.file.name);
    console.log('....FILE');
    console.dir(this.file);
    this.videoSrc = URL.createObjectURL(this.file);
    this.fetchUrlinfo(this.videoSrc);

  }
  
  onTimeineSelect(currentTime){
     console.log('......CONTROLLER',this.playTime)
     console.log("...controll cureenttimr", currentTime);
  }

  private fetchUrlinfo (fileURL: any) {
    this.$http.get(fileURL,{responseType:'arraybuffer'})
    .then(res => res.data)
    .then(buf => {
       const obj = this.getJson(buf);
      const dataObj = typeof obj.data === 'object' ? obj.data :  JSON.parse(obj.data);
      this.networkList = this.convertStringToObject(dataObj.network);
      console.log('..............BBB>.......',this.networkList);

    });
  }


  private convertStringToObject(data:any){
     this.req = new Map();
    const nwList = typeof data === 'object' ? data : JSON.parse(data);
    const seq_timeline = [] as any;
    nwList.forEach((i) => {
      //console.log(i);
      this.req.set(i.requestid, i.webReq);
      //displayRequest(i.webReq);
      //displayResponse(i.webReq);
      if (i.webReq.requesttime) {
        const temp = {} as any;
        temp.time = i.webReq.requesttime;
        temp.url = i.webReq.url;
        temp.method = i.webReq.method;
        temp.isRequest = true;
        temp.requestid = i.requestid;
        seq_timeline.push(temp);
      }
      if (i.webReq.responseTime) {
        const temp = {} as any;
        temp.time = i.webReq.responseTime;
        temp.url = i.webReq.url;
        temp.statusCode = i.webReq.statusCode;
        temp.isRequest = false;
        temp.requestid = i.requestid;
        seq_timeline.push(temp);
      }
     });
     return this.sortTimelineArray(seq_timeline);
  }

  private getJson(buf) {
    const ebmlElms = this.decoder.decode(buf);
    const el = {} as any;
    ebmlElms.forEach(entry => {
      if (entry.name == "FileName")
        el.name = this.dec.decode(entry.data);
      if (entry.name == "FileData")
        el.data = this.dec.decode(entry.data);
    });

    return el
  }

  private sortTimelineArray(arrayTimeline) {
    arrayTimeline.sort((a, b) => {
      return a.time - b.time;
    });
    return arrayTimeline;
  }

}



/**
 * https://github.com/toddmotto/angular-1-5-components-app/blob/master/src/app/components/contact/contact-detail/contact-detail.controller.js
 * https://github.com/toddmotto/angularjs-styleguide
 */