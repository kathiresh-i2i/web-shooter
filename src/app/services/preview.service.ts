import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class PreviewService {
  public s3Storage: any;
  constructor(
    private http: HttpClient
  ) { }

  getDataByURL(url: string) {
    return this.http.get(url, { responseType: 'json' });
  }

  getPresignedURL() {
    const headers = { 'Authorization': localStorage.getItem("access_token"), 'Content-Type': 'application/json' }

    return this.http.post(
      'https://api.mytharunika.com/service/videos',
      {
        "title": "kathir",
        "description": "Steve walking out on stage",
        "contentType": "video/x-matroska"
      },
      {
        headers
      }
    ).toPromise()
      .then(
        res => {
          this.s3Storage = res;
        });
  }

  uploadToServer() {
    var blob = new Blob([window.blobValue], { type: 'video/x-matroska' })
    const headers = { 'Content-Type': 'video/x-matroska' }
    const file = new File([blob], 'kathir.mkv');
    return this.http.put(
      this.s3Storage.s3PutObjectUrl,
      file, {
      headers
    }
    );
  }
}
