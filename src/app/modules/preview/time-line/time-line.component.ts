import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
declare var jsonTree: any;


@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {
  @Input() networkData: any;
  @Input() consoleData: any;
  @Input() selectedNetworkData: any;
  @Output() onSelectedNetworkDataChange = new EventEmitter<any>();
  private responseNode: any;
  private requestBodyNode: any;

  constructor() { }

  ngOnInit(): void {
    console.log('=======networkData=========', this.networkData);
    
  }

  renderNetworkData(data) {
    this.selectedNetworkData = data;
    this.onSelectedNetworkDataChange.emit(data);
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

}
