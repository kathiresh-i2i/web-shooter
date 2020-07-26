import * as angular from 'angular';
import { RecordController } from './record.controller';

export const RecordComponent: angular.IComponentOptions = {
    bindings: {
        submitData: '&',
        stopRecording: '&'
    },
    templateUrl: '/record/record.component.html',
    controller: RecordController
};