import * as angular from 'angular';

 export class CaptureController {

  public static $inject: string[] = ['$http'];

   

  constructor(private $http: angular.IHttpService) {
 
  }

  $onInit() {
   }

  $onChanges(changes) {
    console.log('....onChanges>...', changes);
  }

  $doCheck() {
    console.log("...doCHECK....");
  }

}
 