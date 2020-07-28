
/**
 * Module dependencies.
 */

import * as  angular from 'angular';
import exportedString from '@uirouter/angularjs'

import routes from './oauth.routing';
import { SuccessComponent } from './success/success.component';
import { AuthComponent } from './auth/auth.component';

export const OAUTH_MODULE_NAME = "OAuth";
const MODULE_DEPENDENCIES: Array<string> = [exportedString];

export const PreviewModule = angular.module(OAUTH_MODULE_NAME, MODULE_DEPENDENCIES)
.config(routes)
.component('auth', AuthComponent)
.component('success', SuccessComponent)
.name

