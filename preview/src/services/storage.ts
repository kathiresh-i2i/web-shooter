
export class StorageService {
  public static $inject: string[] = ['$http'];
  public browserInfoValue: Object = {};
  public userInfo: Object = {};
  constructor(private http: angular.IHttpService) { }

  getUserInfo() {
    const url = 'https://webshooter.auth.us-east-1.amazoncognito.com/oauth2/userInfo'
    const headers = { 'Authorization': 'Bearer ' +localStorage.getItem("access_token")}
    return this.http.get(url, { headers });
  }

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
    );
  }

  uploadToServer(s3URL, blobObject) {
    var blob = new Blob([blobObject], { type: 'video/x-matroska' })
    const headers = { 'Content-Type': 'video/x-matroska' }
    const file = new File([blob], 'kathir.mkv');
    return this.http.put(
      s3URL,
      file, {
      headers
    }
    );
  }
}