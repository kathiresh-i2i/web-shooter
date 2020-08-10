import * as angular from 'angular';
import { PopupComponent } from './popup.component';
import { PopupController } from './popup.controller';
import { CAPTURE_MODULE_NAME } from './capture/capture.module';
import { RECORD_MODULE_NAME } from './record/record.module';
import { StorageService } from './services/storage';
   
export const MODULE_NAME = "popup";

const MODULE_DEPENDENCIES: Array<string> = [CAPTURE_MODULE_NAME, RECORD_MODULE_NAME];
export const PopupModule = angular.module(MODULE_NAME, MODULE_DEPENDENCIES)
.controller('PrevieController', PopupController)
.service('StorageService', StorageService)
.component('popup', PopupComponent)
.name;
