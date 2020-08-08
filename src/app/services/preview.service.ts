import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreviewService {

  constructor(
    private http: HttpClient
  ) { }

  getDataByURL(url: string) {
    return this.http.get(url, { responseType: 'json' });
  }
}
