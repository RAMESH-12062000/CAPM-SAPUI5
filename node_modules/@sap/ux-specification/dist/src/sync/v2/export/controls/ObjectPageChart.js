"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalChartSettings = exports.ObjectPageChart = void 0;
const application_1 = require("../../application");
const decorators_1 = require("../../../common/decoration/decorators");
class ObjectPageChart {
}
exports.ObjectPageChart = ObjectPageChart;
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getChartSettingsOBJsectionPathV2
        }
    }),
    (0, decorators_1.validity)({
        since: '1.78.0'
    })
], ObjectPageChart.prototype, "variantManagement", void 0);
class GlobalChartSettings {
}
exports.GlobalChartSettings = GlobalChartSettings;
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageKeys) => (0, application_1.getAppSettingOBJPathV2)(pageKeys) + '/chartSettings'
        }
    }),
    (0, decorators_1.validity)({
        since: '1.78.0'
    })
], GlobalChartSettings.prototype, "variantManagement", void 0);
//# sourceMappingURL=ObjectPageChart.js.map