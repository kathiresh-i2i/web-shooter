import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() videoSrc: string;

  constructor(
    public domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    console.log('===videoSrc', this.videoSrc);
  }

}
