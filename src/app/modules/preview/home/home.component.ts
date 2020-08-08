import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewService } from '../../../services/preview.service';
declare var jsonTree: any;
declare var passToFFmpegv2: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  $ctrl: any;
  routeInfo: any;
  networkData: any;
  consoleData: any;
  browserData: any;
  private requestBodyNode: any;
  private responseNode: any;
  selectedNetworkData: any;

  constructor(

    private activatedRoute: ActivatedRoute,
    private previewService: PreviewService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log('====query params===', params);
      this.routeInfo = params;
      this.getNetworkData();
      this.getConsoleData();
      this.getBrowserData();
    });
  }

  getNetworkData() {
    console.log('=getJSON===2===', this.routeInfo.json);
    this.previewService.getDataByURL(this.routeInfo.json).subscribe(data => {
      this.networkData = data;
      console.log('======network info==', data);
    });
  }

  getConsoleData() {
    this.previewService.getDataByURL(this.routeInfo.console).subscribe(data => {
      this.consoleData = data;
      console.log('======console info==', data);

    });
  }

  getBrowserData() {
    this.previewService.getDataByURL(this.routeInfo.browser).subscribe(data => {
      this.browserData = data;
      console.log('======browser info==', data);

    });
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

  highlightTimeline(network: any) {
    // if (network.requesttime <= this.playTime) {
    //   const timelineEle = document.getElementById('timeline_' + network.requestid);
    //   if (timelineEle && !timelineEle.classList.contains('bg-gray-200')) {
    //     timelineEle.classList.add('bg-gray-200', 'text-gray-800');
    //     timelineEle.scrollIntoView({
    //       behavior: 'smooth', block: 'nearest'
    //     });
    //     this.renderNetworkData(network);
    //   }
    // }
  }

  downloadVideo() {
    passToFFmpegv2(this.networkData, this.consoleData, this.browserData, this.routeInfo.mp4, this.routeInfo.name)
  }


}


//chrome-extension://cdhkdpajcpijhjfoankkbaaeaahfleho/preview/index.html?mp4=blob:chrome-extension://cdhkdpajcpijhjfoankkbaaeaahfleho/90e50367-548e-48f4-b3bd-b4cfb1518cfe&json=blob:chrome-extension://cdhkdpajcpijhjfoankkbaaeaahfleho/ae098540-e651-4a73-afc1-fcde05c3ae3e&console=&browser=blob:chrome-extension://cdhkdpajcpijhjfoankkbaaeaahfleho/42d74b92-23f3-45ad-b483-551f59d4498e&name=Record%20Network