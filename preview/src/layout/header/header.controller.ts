import { StorageService } from '../../services';


export class HeaderController {
  public static $inject: string[] = ['StorageService', '$location'];
  userInfo: Object = {};

  constructor(private storageService: StorageService,private $location: angular.ILocationService) {
  }

  $doCheck() {
    this.userInfo = this.storageService.userInfo;
  }

  login() {
    const client_id = "758f2oqr8h4ossip9bi418eev2";
    const scope = "openid";
    const redirect_uri = "https://web.mytharunika.com";
    const response_type = "token";
    const url = `https://webshooter.auth.us-east-1.amazoncognito.com/login?client_id=${client_id}&response_type=${response_type}&scope=${scope}&redirect_uri=${redirect_uri}`
    console.log("..oauth..URL>>>", url);
    window.location.replace(url);
  }
}