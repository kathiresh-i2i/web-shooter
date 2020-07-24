import * as angular from 'angular';
import { RecordComponent } from './Record.component';
 
import { RecordController } from './record.controller';
   
export const RECORD_MODULE_NAME = "record";

const MODULE_DEPENDENCIES: Array<string> = [];
export const RecordModule = angular.module(RECORD_MODULE_NAME, MODULE_DEPENDENCIES)
.controller('PrevieController', RecordController)
.component('record', RecordComponent)
.name;
