import * as angular from 'angular';
import { TEMPLATE_MODULE_NAME } from './template.module';
angular
    .bootstrap(
        document,
        [TEMPLATE_MODULE_NAME]
    );