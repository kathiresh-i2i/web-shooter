import * as angular from 'angular';
import { PreviewComponent } from './preview.component';
export const MODULE_NAME = "preview";

const MODULE_DEPENDENCIES: Array<string> = [];
export const PopupModule = angular.module('popup', MODULE_DEPENDENCIES)
.component('preview', PreviewComponent)
.name;
