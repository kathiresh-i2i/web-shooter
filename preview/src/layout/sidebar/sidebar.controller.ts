import { StorageService } from '../../services';


export class SidebarController {
  public static $inject: string[] = ['StorageService'];
  browserInfoData: any;

  constructor(private storageService: StorageService ) {
  }

  $doCheck() {
    this.browserInfoData = this.storageService.browserInfoValue;
  }
}