import * as angular from 'angular';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
export const LAYOUT_MODULE = "LAYOUT";

const MODULE_DEPENDENCIES: Array<string> = [];
export const LayoutModule = angular.module(LAYOUT_MODULE, MODULE_DEPENDENCIES)
.component('header', HeaderComponent)
.component('sidebar', SidebarComponent)
.name;
