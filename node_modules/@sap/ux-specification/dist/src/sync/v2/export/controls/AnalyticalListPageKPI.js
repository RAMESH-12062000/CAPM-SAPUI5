"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPISettings = void 0;
const decorators_1 = require("../../../common/decoration/decorators");
const application_1 = require("../../application");
class KPISettings {
}
exports.KPISettings = KPISettings;
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageKeys, _manifest, KPIKey) => (0, application_1.getKPISettingsPath)(pageKeys, KPIKey)
        }
    })
], KPISettings.prototype, "model", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageKeys, _manifest, KPIKey) => (0, application_1.getKPISettingsPath)(pageKeys, KPIKey)
        }
    })
], KPISettings.prototype, "entitySet", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageKeys, _manifest, KPIKey) => (0, application_1.getKPISettingsPath)(pageKeys, KPIKey)
        }
    })
], KPISettings.prototype, "qualifier", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageKeys, _manifest, KPIKey) => (0, application_1.getKPISettingsPath)(pageKeys, KPIKey)
        }
    })
], KPISettings.prototype, "filterable", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageKeys, _manifest, KPIKey) => (0, application_1.getKPISettingsPath)(pageKeys, KPIKey)
        }
    })
], KPISettings.prototype, "detailNavigation", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageKeys, _manifest, KPIKey) => (0, application_1.getKPISettingsPath)(pageKeys, KPIKey)
        }
    })
], KPISettings.prototype, "groupId", void 0);
//# sourceMappingURL=AnalyticalListPageKPI.js.map