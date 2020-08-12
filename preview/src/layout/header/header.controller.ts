import { StorageService } from '../../services';
declare var chrome: any;

export class HeaderController {
  public static $inject: string[] = ['StorageService', '$location'];
  userInfo: any;

  constructor(private storageService: StorageService) {
  }

  $onInit() {
    if (localStorage.getItem('access_token') && !this.userInfo) {
      this.getUserInfo();
    }
  }

  login(callback) {
    var client_id = "omqqj8qc6evo04ni1gu143vun";
    var scope = "openid";
    var redirect_uri = "https://cdhkdpajcpijhjfoankkbaaeaahfleho.chromiumapp.org/callback";
    var response_type = "token";
    var url = "https://webshooter.auth.us-east-1.amazoncognito.com/login?client_id=" + client_id + "&response_type=" + response_type + "&scope=" + scope + "&redirect_uri=" + redirect_uri;
    console.log("..oauth..URL>>>", url);

    var options = {
      'url': url,
      'interactive': true
    }
    chrome.identity.launchWebAuthFlow(options, (redirectUri) => {
      console.log('launchWebAuthFlow completed', chrome.runtime.lastError);
      callback(redirectUri)
    });
  }

  loginAndParseToken() {
    this.login((res) => {
      this.parseAndGetToken(res);
    })
  }

  parseAndGetToken(redirectUri) {
    if (redirectUri) {
      var url = redirectUri.replace('#', '?');
      var parsedUrl = new URL(url);
      localStorage.setItem('id_token', parsedUrl.searchParams.get('id_token'));
      localStorage.setItem('access_token', parsedUrl.searchParams.get('access_token'));
      localStorage.setItem('token_type', parsedUrl.searchParams.get('token_type'));
      localStorage.setItem('expires_in', parsedUrl.searchParams.get('expires_in'));
      this.getUserInfo();
    }
  }

  getUserInfo() {
    this.storageService.getUserInfo().then(data => {
      this.userInfo = data.data;
      this.saveUserInfo(data.data);
    })
  }

  saveUserInfo(info) {
    this.storageService.put('users', info)
  }

  getUserInfoByToken() {
    if (localStorage.getItem('access_token') && !this.userInfo) {
      this.getUserInfo();
    }
  }

  logout() {
    // this.storageService.remove('users', this.userInfo.email);
    // localStorage.clear();
    // this.userInfo = null;
  }
}