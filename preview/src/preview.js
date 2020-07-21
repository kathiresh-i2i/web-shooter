"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const angular = require("angular");
const preview_module_1 = require("./preview.module");
angular
    .bootstrap(document, [preview_module_1.MODULE_NAME]);
