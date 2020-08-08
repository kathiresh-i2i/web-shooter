import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { PreviewRoutingModule } from './preview-routing.module';
import { VideoComponent } from './video/video.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { RequestComponent } from './request/request.component';
import { ResponseComponent } from './response/response.component';


@NgModule({
  declarations: [HomeComponent, VideoComponent, TimeLineComponent, RequestComponent, ResponseComponent],
  imports: [
    CommonModule,
    PreviewRoutingModule
  ]
})
export class PreviewModule { }
