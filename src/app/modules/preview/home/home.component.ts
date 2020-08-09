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
  private s3StorageInfo: any;
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

  SelectedNetworkDataChangeEventHandler($event: any) {
    this.selectedNetworkData = $event;
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

  downloadVideo(isUploadToServer: boolean) {
    passToFFmpegv2(this.networkData, this.consoleData, this.browserData, this.routeInfo.mp4, this.routeInfo.name, isUploadToServer)
  }

  // async getPresignedURL() {
  //   console.log('======getPresignedURL===');
  //   this.previewService.getPresignedURL().subscribe(data => {
  //     this.s3StorageInfo = data;
  //     res  = data;
  //     console.log('====res.s3PutObjectUrl', res.s3PutObjectUrl);
  //     localStorage.setItem('s3URL', res.s3PutObjectUrl);
  //   });
  // }
  
  oAuthLogin() {
    console.log('===oAuthLogin=====');
    const client_id = "758f2oqr8h4ossip9bi418eev2";
    const scope = "openid";
    const redirect_uri = "https://web.mytharunika.com";
    const response_type = "token";
    const url = `https://webshooter.auth.us-east-1.amazoncognito.com/login?client_id=${client_id}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}`
    console.log("..oauth..URL>>>", url);
    window.location.replace(url);
  }

  async uploadToServer() {
    await this.downloadVideo(true);
    await this.previewService.getPresignedURL();
    this.previewService.uploadToServer().subscribe(data => {
      console.log('====uploadToServer===Success', data);
    })
  }
}

// https://web.mytharunika.com/#id_token=eyJraWQiOiJCVlVIR1ppYzRVMXpcL1dKOXFhQ3VsR3cwUHNha3FtbmNaaERtblNTNTJvTT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiUHNBRTdIcXc1R2plNV9ON2hNaTN2dyIsInN1YiI6IjY0MjE5NDgxLTI3YTctNGQwOC1iMDdkLTM4NDM0YTU2Yzc4MSIsImF1ZCI6Ijc1OGYyb3FyOGg0b3NzaXA5Ymk0MThlZXYyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImV2ZW50X2lkIjoiOTU3N2EyOTgtZjFjZC00MDA5LWE4MzAtNGY3Zjk0NWNlM2Q5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTY5Nzk0MzcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2lUWXBtejFDYSIsImNvZ25pdG86dXNlcm5hbWUiOiI2NDIxOTQ4MS0yN2E3LTRkMDgtYjA3ZC0zODQzNGE1NmM3ODEiLCJleHAiOjE1OTY5ODMwMzcsImlhdCI6MTU5Njk3OTQzNywiZW1haWwiOiJrYXRoaXJAZ21haWwuY29tIn0.DmrW2za-OKW9L6hGPy1ptovT_mtM0zQdnjeJpKRl3YwTb0mTE3hha8iR2QgrevWQoY-EJithmwKXE39p1E8HVeVWf_PrsuxDXNLXnq_LxTQKhoVhFVupCrXbEart8TJViIKMqQEtDLUYmQLD5SvPb0v8LWyYMA1V4fjRK-lS6XZhzQ-XTiYDOIVAn0RXuTcFQIbIM4xHxTT3DTmq1mfN78V2xo99ev7Gv2qSQsdeR5UEk9vNg8B8C9ICYJxUAQtDhUou_uuHYVRdld2lL0x6JaSm8lIZbj4jEEfMJ2ae1yPNt4mGHfqtbv96hxvL6oYOL9AGWoH0artRcAdaggS4VA&access_token=eyJraWQiOiJXV3E2cVNyZmNMZmNUWGNiWFBGVVM3NDRDYXZBSWp3QUZXcnRtV3BcL0JuVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2NDIxOTQ4MS0yN2E3LTRkMDgtYjA3ZC0zODQzNGE1NmM3ODEiLCJldmVudF9pZCI6Ijk1NzdhMjk4LWYxY2QtNDAwOS1hODMwLTRmN2Y5NDVjZTNkOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIiwiYXV0aF90aW1lIjoxNTk2OTc5NDM3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9pVFlwbXoxQ2EiLCJleHAiOjE1OTY5ODMwMzcsImlhdCI6MTU5Njk3OTQzNywidmVyc2lvbiI6MiwianRpIjoiNDZhMzhlODItMTk4NC00OGQ5LTk5NWQtYjViMDYxZTI2MjllIiwiY2xpZW50X2lkIjoiNzU4ZjJvcXI4aDRvc3NpcDliaTQxOGVldjIiLCJ1c2VybmFtZSI6IjY0MjE5NDgxLTI3YTctNGQwOC1iMDdkLTM4NDM0YTU2Yzc4MSJ9.cysAeet5TYf8un1eZtMcLbcYps-f3VkdFTPJtI07xE5zemDXZITmK0ig-WgT9vERPYWyNI2WLHxcD4xL5Nb8NWYTw6AIZFi9gq7yqEF8iKZu6SIvQpmAY0AR0IMpcFQZ532_gHpo4p7qElHgp-h2wDvPZ_uXcyXJOdY9CbiWkpy2uJHaWxbTIm3-P7Rq12tNJKENeHypeLXt7GX94x-WHDO874aBYOf85kGIk87HpSIMTTEErDGSULBmNf31OWtJb55F5I5Kyg7ZCZnVwx8EO1yynRXDGsoANsEGpz70eOdXZncod8bBV-m-frWF762kl1K5Xn2duxFgsugvfvv5gg&expires_in=3600&token_type=Bearer