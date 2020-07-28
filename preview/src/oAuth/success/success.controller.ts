
export class SuccessController {
    public static $inject: string[] = ['$stateParams']
    constructor(private $stateParams: angular.ui.IStateParamsService){

    }

    $onInit(){
        console.log("....... $stateParams..",this.$stateParams);
    }

}