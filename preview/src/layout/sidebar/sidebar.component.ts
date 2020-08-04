import * as angular from 'angular';
import { SidebarController } from './sidebar.controller'
 
export const SidebarComponent: angular.IComponentOptions  = {
  templateUrl: '/layout/sidebar/sidebar.component.html',
  controller: SidebarController
};