import * as angular from 'angular';

export const FileOnChangeDirective = ($parse) => (<angular.IDirective>{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {        
        element.bind('change', function(event: any) {
           ngModel.$setViewValue( (event.target).files[0])
           scope.$apply();
        });

        scope.$watch(function(){
             return ngModel.$viewValue;
        }, function (value){
            if(!value){
               element.val('')
            }
        })
     }
});

FileOnChangeDirective.$inject = ['$parse'];