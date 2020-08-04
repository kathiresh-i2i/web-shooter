import * as ebml from 'ts-ebml';
import angular = require('angular');
import { StorageService } from './services';


declare var jsonTree: any;
declare var passToFFmpegv2: any;
export class PreviewController {

  public static $inject: string[] = ['$http', '$location', 'StorageService'];

  file: File;
  videoSrc: any;
  networkData: any;
  consoleData: any
  browserInfoData: any;
  playTime: any;
  selectedNetworkData: any;
  videoName: string;
  private decoder: any;
  private dec: any;
  private req: any;
  private requestBodyNode: any;
  private responseNode: any;
  private routeInfo: any = {};

  constructor(
    private $http: angular.IHttpService,
    private $location: angular.ILocationService,
    private storageService: StorageService
  ) {
    this.decoder = new ebml.Decoder()
    this.dec = new TextDecoder("utf-8");
  }

  $onInit() {
    this.getRouteInfo();
    if(this.videoSrc){
      this.getJSON();
      this.getConsoleData();
      this.getBrowserData();
    }
  }

  $onChanges(changes) {
    console.log('....onChanges>...', changes);
  }

  $doCheck() {
    console.log("...doCHECK....", this.playTime);
  }

  getRouteInfo() {
    if (this.$location) {
      const url = new URL(this.$location.absUrl());
      const search_params = url.searchParams;
      this.routeInfo.mp4 = search_params.get('mp4');
      this.routeInfo.json = search_params.get('json');
      this.routeInfo.browser = search_params.get('browser');
      this.routeInfo.console = search_params.get('console');
      this.routeInfo.browser = search_params.get('browser') || '';
      this.videoName = search_params.get('name') || 'Recorded Video';
      this.videoSrc = this.routeInfo.mp4;
      console.log('==== this.routeInfo==', this.routeInfo);

    }
  }

  getJSON() {
    this.$http.get(this.routeInfo.json, { responseType: 'json' })
      .then(res => res.data)
      .then(data => {
        console.log('============JSON-----', data);
        this.networkData = data;
      });
  }

  getConsoleData() {
    this.$http.get(this.routeInfo.console, { responseType: 'json' })
      .then(res => res.data)
      .then(data => {
        console.log('============Console-----', data);
        this.consoleData = data;
      });
  }

  getBrowserData() {
    this.$http.get(this.routeInfo.browser, { responseType: 'json' })
      .then(res => res.data)
      .then(data => {
        console.log('============Browser Info-----', data);
        this.browserInfoData = data;
        this.storageService.browserInfoValue = this.browserInfoData;
      });
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

 fetchUrlinfo(fileURL: any) {
    this.$http.get(fileURL, { responseType: 'arraybuffer' })
      .then(res => res.data)
      .then(buf => {
        const obj = this.getJson(buf);
        const dataObj = typeof obj.data === 'object' ? obj.data : JSON.parse(obj.data);
        this.networkData = typeof dataObj.network === 'object' ? dataObj.network : JSON.parse(dataObj.network);
        this.consoleData = typeof dataObj.console === 'object' ? dataObj.console : JSON.parse(dataObj.console);
        this.browserInfoData = typeof dataObj.browser === 'object' ? dataObj.browser : JSON.parse(dataObj.browser);
        this.storageService.browserInfoValue = this.browserInfoData;
        //   this.networkList = this.convertStringToObject(dataObj.network);
        //   const output= [];
        //   this.networkList.forEach(function(item) {
        //     var existing = output.filter(function(v, i) {
        //       return v.requestid == item.requestid;
        //     });
        //     if (existing.length) {
        //       var existingIndex = output.indexOf(existing[0]);
        //       output[existingIndex] =  { ...output[existingIndex], ...item }  
        //     } else {
        //       output.push(item);
        //     }
        //   });        
        //   this.networkList = output;

      });
  }


  // private convertStringToObject(data: any) {
  //   this.req = new Map();
  //   const nwList = typeof data === 'object' ? data : JSON.parse(data);
  //   const seq_timeline = [] as any;
  //   nwList.forEach((i) => {
  //     //console.log(i);
  //     this.req.set(i.requestid, i.webReq);
  //     //displayRequest(i.webReq);
  //     //displayResponse(i.webReq);
  //     if (i.webReq.requesttime) {
  //       const temp = {} as any;
  //       temp.time = i.webReq.requesttime;
  //       temp.url = i.webReq.url;
  //       temp.method = i.webReq.method;
  //       temp.isRequest = true;
  //       temp.requesttime = i.webReq.requesttime;
  //       temp.requestid = i.requestid;
  //       temp.requestHeaders = i.webReq.requestHeaders;
  //       temp.statusCode = i.webReq.statusCode;
  //       temp.type = i.webReq.type;
  //       temp.requestTime = i.webReq.requesttime;
  //       seq_timeline.push(temp);
  //     }
  //     if (i.webReq.responseTime) {
  //       const temp = {} as any;
  //       temp.time = i.webReq.responseTime;
  //       temp.responseTime = i.webReq.responseTime;
  //       temp.url = i.webReq.url;
  //       temp.statusCode = i.webReq.statusCode;
  //       temp.responseTime = i.webReq.responseTime;
  //       temp.isRequest = false;
  //       temp.requestid = i.requestid;
  //       temp.responseHeaders = i.webReq.responseHeaders;
  //       temp.responseBody = i.webReq.responseBody;
  //       seq_timeline.push(temp);
  //     }
  //   });
  //   return this.sortTimelineArray(seq_timeline);
  // }

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
    this.selectedNetworkData = data;
    setTimeout(() => {
      if (data.responseBody) {
        this.responseNode = document.getElementById("response");
        this.responseNode.innerHTML = '';
        const tree = jsonTree.create(JSON.parse(data.responseBody), this.responseNode);
        tree.expand();
        tree.expand(function (node) {
          return node.childNodes.length < 2;
        });
      }
      if (data.requestBody) {
        this.requestBodyNode = document.getElementById("requestBody");
        this.requestBodyNode.innerHTML = '';
        const tree = jsonTree.create(JSON.parse(data.requestBody), this.requestBodyNode);
        tree.expand();
        tree.expand(function (node) {
          return node.childNodes.length < 2;
        });
      }
    }, 100);

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

  highlightTimeline(network: any) {
    if (network.requesttime <= this.playTime) {
      const timelineEle = document.getElementById('timeline_' + network.requestid);
      if (timelineEle && !timelineEle.classList.contains('bg-gray-200')) {
        timelineEle.classList.add('bg-gray-200', 'text-gray-800');
        timelineEle.scrollIntoView({
          behavior: 'smooth', block: 'nearest'
          });
        this.renderNetworkData(network);
      }
    }
  }

  downloadVideo() {
    passToFFmpegv2(this.networkData, this.consoleData, this.browserInfoData, this.videoSrc, this.videoName)
  }
}



/**
 * https://github.com/toddmotto/angular-1-5-components-app/blob/master/src/app/components/contact/contact-detail/contact-detail.controller.js
 * https://github.com/toddmotto/angularjs-styleguide
 */