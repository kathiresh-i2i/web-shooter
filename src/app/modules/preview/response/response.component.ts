import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  @Input() selectedNetworkData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
