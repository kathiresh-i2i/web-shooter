import * as angular from 'angular';
import { MODULE_NAME } from './preview.module';
angular
    .bootstrap(
        document,
        [MODULE_NAME]
    );