import * as angular from 'angular';
import { PreviewComponent } from './preview.component';
import { LAYOUT_MODULE } from './layout/layout.module';

import { PreviewController } from './preview.controller';
import { FileOnChangeDirective } from './directives/filemodel.directive';
import { VideoControlsDirective } from './directives/videoControl.directive';
import { StorageService} from './services';
import { OAUTH_MODULE_NAME } from './oAuth/oauth';
  
export const MODULE_NAME = "display";

const MODULE_DEPENDENCIES: Array<string> = [LAYOUT_MODULE, OAUTH_MODULE_NAME];
export const PreviewModule = angular.module(MODULE_NAME, MODULE_DEPENDENCIES)
.service('StorageService', StorageService)
.directive('fileOnChange', FileOnChangeDirective)
.directive('videoControl', VideoControlsDirective)
.controller('PreviewController', PreviewController)
.component('preview', PreviewComponent)
.name;
