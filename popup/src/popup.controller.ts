import * as ebml from 'ts-ebml';
import * as angular from 'angular';

 export class PopupController {

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

   recordScreen(){
    
   }

}



/**
 * https://github.com/toddmotto/angular-1-5-components-app/blob/master/src/app/components/contact/contact-detail/contact-detail.controller.js
 * https://github.com/toddmotto/angularjs-styleguide
 */