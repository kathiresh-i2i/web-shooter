import * as ebml from 'ts-ebml';
import angular = require('angular');

declare var jsonTree: any;
export class PreviewCotroller {

  public static $inject: string[] = ['$http'];

  file: File;
  videoSrc: any;
  networkList: any;
  playTime: any;
  private decoder: any;
  private dec: any;
  private req: any;
  private requestNode: any;
  private responseNode: any;

  constructor(private $http: angular.IHttpService) {
    this.decoder = new ebml.Decoder()
    this.dec = new TextDecoder("utf-8");
  }

  $onInit() {
    this.requestNode = document.getElementById("request");
    this.responseNode = document.getElementById("response");
  }

  $onChanges(changes) {
    console.log('....onChanges>...', changes);
  }

  $doCheck() {
    console.log("...doCHECK....", this.playTime);
  }

  onFileChange() {
    console.log(this.file.name);
    console.log('....FILE');
    console.dir(this.file);
    this.videoSrc = URL.createObjectURL(this.file);
    this.fetchUrlinfo(this.videoSrc);

  }

  onTimeineSelect(currentTime) {
    console.log('......CONTROLLER', this.playTime)
    console.log("...controll cureenttimr", currentTime);
  }

  private fetchUrlinfo(fileURL: any) {
    this.$http.get(fileURL, { responseType: 'arraybuffer' })
      .then(res => res.data)
      .then(buf => {
        const obj = this.getJson(buf);
        const dataObj = typeof obj.data === 'object' ? obj.data : JSON.parse(obj.data);
        this.networkList = this.convertStringToObject(dataObj.network);
        const output= [];
        this.networkList.forEach(function(item) {
          var existing = output.filter(function(v, i) {
            return v.requestid == item.requestid;
          });
          if (existing.length) {
            var existingIndex = output.indexOf(existing[0]);
            output[existingIndex] =  { ...output[existingIndex], ...item }  
          } else {
            output.push(item);
          }
        });        
        this.networkList = output;

      });
  }


  private convertStringToObject(data: any) {
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
        temp.requesttime = i.webReq.requesttime;
        temp.requestid = i.requestid;
        temp.requestHeaders = i.webReq.requestHeaders;
        temp.statusCode = i.webReq.statusCode;
        temp.type = i.webReq.type;
        temp.requestTime = i.webReq.requesttime;
        seq_timeline.push(temp);
      }
      if (i.webReq.responseTime) {
        const temp = {} as any;
        temp.time = i.webReq.responseTime;
        temp.responseTime = i.webReq.responseTime;
        temp.url = i.webReq.url;
        temp.statusCode = i.webReq.statusCode;
        temp.responseTime = i.webReq.responseTime;
        temp.isRequest = false;
        temp.requestid = i.requestid;
        temp.responseHeaders = i.webReq.responseHeaders;
        temp.responseBody = i.webReq.responseBody;
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


  renderNetworkData(data) {
    if (data.isRequest) {
      delete data.isRequest;
      this.requestNode.innerHTML = '';
      var tree = jsonTree.create(data, this.requestNode);
      console.log('==tree', tree);
      tree.expand();
      tree.expand(function (node) {
        return node.childNodes.length < 2;
      });
    } else {
      delete data.isRequest;
      this.responseNode.innerHTML = '';
      var tree = jsonTree.create(data, this.responseNode);
      console.log('==tree', tree);
      tree.expand();
      tree.expand(function (node) {
        return node.childNodes.length < 2;
      });
    }
  }


  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        //  const key = keyGetter(item);
        //  const collection = map.get(key);
        //  if (!collection) {
        //      map.set(key, [item]);
        //  } else {
        //      collection.push(item);
        //  }
    });
    return map;
}


}



/**
 * https://github.com/toddmotto/angular-1-5-components-app/blob/master/src/app/components/contact/contact-detail/contact-detail.controller.js
 * https://github.com/toddmotto/angularjs-styleguide
 */