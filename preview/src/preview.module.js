"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupModule = exports.MODULE_NAME = void 0;
const angular = require("angular");
const preview_component_1 = require("./preview.component");
exports.MODULE_NAME = "preview";
const MODULE_DEPENDENCIES = [];
exports.PopupModule = angular.module('popup', MODULE_DEPENDENCIES)
    .component('preview', preview_component_1.PreviewComponent)
    .name;
