import * as angular from 'angular';

interface IScope extends angular.IScope {
   onTimeUpdate: any,
   videoTime: any;
}

export const VideoControlsDirective = ($parse) => (<angular.IDirective>{
   restrict: 'A',
   scope: {
      onTimeUpdate: "&",
      videoTime: "="
   },
   link: function (scope: IScope, element, attrs, ngModelCtrl) {

      element.bind('timeupdate', function (e: any) {
         scope.videoTime = (e.currentTarget).currentTime;
         scope.onTimeUpdate({currentTime: scope.videoTime});
         scope.$apply();
      });
   }
});

VideoControlsDirective.$inject = ['$parse'];