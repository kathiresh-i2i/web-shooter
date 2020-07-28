import * as angular from 'angular';
import { AuthController } from './auth.controller';
export const AuthComponent: angular.IComponentOptions  = {
  template: `<button ng-click="$ctrl.oauthLogin()">Login</button>`,
  controller: AuthController
  };