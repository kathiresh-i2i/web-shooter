import * as angular from 'angular';
import { CaptureComponent } from './capture.component';
 
import { CaptureController } from './capture.controller';
   
export const CAPTURE_MODULE_NAME = "capture";

const MODULE_DEPENDENCIES: Array<string> = [];
export const CaptureModule = angular.module(CAPTURE_MODULE_NAME, MODULE_DEPENDENCIES)
.controller('PrevieController', CaptureController)
.component('capture', CaptureComponent)
.name;
