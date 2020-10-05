
    import * as angular from 'angular';
    import { MODULE_NAME } from './preview.module';

    const MODULE_DEPENDENCIES: Array<string> = [MODULE_NAME];
    export const TEMPLATE_MODULE_NAME ="templates";
    export const TemplateModule = angular.module("templates",MODULE_DEPENDENCIES).run(["$templateCache", function($templateCache) {
    $templateCache.put('/preview.component.html','<div class="container-fluid"><div class="d-sm-flex align-items-center justify-content-between mb-3"><div class="mb-0 text-gray-800 font-20">{{$ctrl.videoName}}</div><div><button type="button" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" ng-click="$ctrl.downloadVideo(false);" ng-disabled="$ctrl.disableDownloadBtn"><i class="fas fa-download fa-sm text-white-50"></i> Download</button> <button type="button" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><input type="file" id="browsefile" accept=".mkv,.webm" ng-model="$ctrl.file" ng-change="$ctrl.onFileChange()" file-on-change> <i class="fas fa-upload fa-sm text-white-50"></i> Upload</button></div></div><div class="row"><div class="col-xl-7 col-lg-7"><div class="card shadow mb-4"><div class="card-body embed-responsive embed-responsive-16by9"><video id="vid" controls src="{{$ctrl.videoSrc}}" class="embed-responsive-item" video-control video-time="$ctrl.playTime" on-time-update="$ctrl.onTimeineSelect({currentTime: $ctrl.playTime})"></video></div></div></div><div class="col-xl-5 col-lg-5"><div class="card shadow mb-4"><div class="card-header d-flex flex-row align-items-center justify-content-between"><ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist"><li class="nav-item"><a class="nav-link active" id="networklogstab" data-toggle="tab" href="#networklogs" role="tab" aria-controls="networklogs" aria-selected="true">Networks</a></li><li class="nav-item"><a class="nav-link" id="consolelogtab" data-toggle="tab" href="#consolelog" role="tab" aria-controls="consolelog" aria-selected="false">Console</a></li></ul></div><div class="card-body pt-0 m-h-370"><div class="timeline"><div class="tab-content mt-3"><div class="tab-pane active" id="networklogs" role="tabpanel" aria-labelledby="networklogstab"><div id="timeline_{{x.requestid}}" class="notice notice-sm notice-{{x.statusCode}}" ng-repeat="x in $ctrl.networkData" ng-click="$ctrl.renderNetworkData(x);" ng-class="$ctrl.highlightTimeline(x);"><div><strong>{{x.method}}</strong> {{x.url}} <strong>{{x.statusCode }}</strong></div></div></div><div class="tab-pane" id="consolelog" role="tabpanel" aria-labelledby="consolelogtab"><div ng-repeat="console in $ctrl.consoleData" class="p-10">{{console.type}}: {{console.message}}</div></div></div></div></div></div></div></div><div class="row"><div class="col-lg-6 pr-1 d-flex"><div class="card shadow mb-4 width-100"><div class="card-header d-flex flex-row align-items-center justify-content-between"><h6 class="m-0 font-weight-bold text-primary">Request</h6></div><div class="card-body m-h-370"><div class="p-b-30">{{$ctrl.selectedNetworkData.method}} {{$ctrl.selectedNetworkData.url}} {{$ctrl.selectedNetworkData.statusCode}}</div><div class="content" id="request-headers" ng-if="$ctrl.selectedNetworkData.requestHeaders"><h6 class="m-0 font-weight-bold text-primary p-b-10">Request Headers</h6><ul class="list-group header-info-view"><li class="list-group-item line-height-20" ng-repeat="(header, value) in $ctrl.selectedNetworkData.requestHeaders"><span class="header-item">{{header}}</span>: <span>{{value}}</span></li></ul></div><div class="content" id="response-headers" ng-if="$ctrl.selectedNetworkData.requestBody"><h6 class="m-0 font-weight-bold text-primary p-t-b-10">Request Body</h6><div class="body-info-view" id="requestBody"></div></div></div></div></div><div class="col-lg-6 pl-1 d-flex"><div class="card shadow mb-4 width-100"><div class="card-header d-flex flex-row align-items-center justify-content-between"><h6 class="m-0 font-weight-bold text-primary">Response</h6></div><div class="card-body m-h-370"><div class="content" id="response-headers" ng-if="$ctrl.selectedNetworkData.responseHeaders"><h6 class="m-0 font-weight-bold text-primary p-t-b-10">Response Headers</h6><ul class="list-group header-info-view"><li class="list-group-item line-height-20" ng-repeat="(header, value) in $ctrl.selectedNetworkData.responseHeaders"><span class="header-item">{{header}}</span>: <span>{{value}}</span></li></ul></div><div class="content" class="pt-4 pb-2" ng-if="$ctrl.selectedNetworkData.responseBody"><h6 class="m-0 font-weight-bold text-primary p-t-b-10">Response Body</h6><div class="body-info-view" id="response"></div></div></div></div></div></div></div><div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Videos</h5><button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">\xD7</span></button></div><div class="modal-body"><div class="p-b-10 cursor-pointer" ng-repeat="video in $ctrl.uploadedVideoHistory.data" ng-click="$ctrl.loadSelectedVideo(video)"><div><span>{{video.Title}}.{{video.FileFormat}}</span></div></div></div><div class="modal-footer"><button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button></div></div></div></div><div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">{{$ctrl.alertMessage.title}}</h5><button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">\xD7</span></button></div><div class="modal-body"><div class="p-b-10 cursor-pointer"><div><span>{{$ctrl.alertMessage.message}}</span></div></div></div><div class="modal-footer"><button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button></div></div></div></div>');
$templateCache.put('/oAuth/oauth.component.html','');
$templateCache.put('/layout/header/header.component.html','<nav class="navbar navbar-expand navbar-light bg-white topbar mb-3 static-top shadow"><button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3"><i class="fa fa-bars"></i></button><ul class="navbar-nav ml-auto"><li class="nav-item dropdown no-arrow d-sm-none"><a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-search fa-fw"></i></a><div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown"><form class="form-inline mr-auto w-100 navbar-search"><div class="input-group"><input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"><div class="input-group-append"><button class="btn btn-primary" type="button"><i class="fas fa-search fa-sm"></i></button></div></div></form></div></li><li class="nav-item dropdown no-arrow mx-1"><auth></auth></li><li class="nav-item dropdown no-arrow mx-1"></li><li class="nav-item dropdown no-arrow"><div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown"><a class="dropdown-item" href="" ng-click="$ctrl.loginAndParseToken();" ng-if="!$ctrl.userInfo.name"><i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Login </a><a class="dropdown-item" href="#"><i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Settings </a><a class="dropdown-item" data-toggle="modal" href="#logoutModal"><i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> History</a><div class="dropdown-divider"></div><a class="dropdown-item" href="" ng-click="$ctrl.logout();" ng-if="$ctrl.userInfo.name"><i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout</a></div></li></ul></nav>');
$templateCache.put('/layout/sidebar/sidebar.component.html','<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion h-100" id="accordionSidebar"><a class="sidebar-brand d-flex align-items-center justify-content-center"><img src="/assets/images/logo.png" class="height-50"></a><div class="info-section"><div class="sidebar-brand-text browser-info-title">Browser Info</div><hr class="sidebar-divider"><table class="line-height-25 text-xs"><tbody><tr><td>Platform:</td><td>{{$ctrl.browserInfoData.platform}}</td></tr><tr><td>Browser:</td><td>{{$ctrl.browserInfoData.browserName}}</td></tr><tr><td>Version:</td><td>{{$ctrl.browserInfoData.browserVersion}}</td></tr><tr><td>Memory:</td><td>{{$ctrl.browserInfoData.deviceMemory}}</td></tr><tr><td>Language:</td><td>{{$ctrl.browserInfoData.language}}</td></tr><tr><td>Cookie Enabled:</td><td>{{$ctrl.browserInfoData.cookieEnabled}}</td></tr><tr><td>Time:</td><td>{{$ctrl.browserInfoData.recordingTime}}</td></tr></tbody></table></div></ul>');}]).name;