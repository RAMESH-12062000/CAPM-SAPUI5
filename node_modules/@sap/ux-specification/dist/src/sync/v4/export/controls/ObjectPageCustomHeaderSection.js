"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectPageCustomHeaderSectionFragment = exports.ObjectPageCustomHeaderSectionFlexSettings = void 0;
const decorators_1 = require("../../../common/decoration/decorators");
const application_1 = require("../../application");
const common_1 = require("../../../common");
class ObjectPageCustomHeaderSectionFlexSettings {
}
exports.ObjectPageCustomHeaderSectionFlexSettings = ObjectPageCustomHeaderSectionFlexSettings;
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageName, manifest, sectionId) => (0, application_1.getObjectPageCustomHeaderSectionPath)(pageName, manifest, sectionId, 'flexSettings')
        }
    }),
    (0, decorators_1.validity)({
        since: '1.81.0'
    })
], ObjectPageCustomHeaderSectionFlexSettings.prototype, "designtime", void 0);
class ObjectPageCustomHeaderSectionFragment {
}
exports.ObjectPageCustomHeaderSectionFragment = ObjectPageCustomHeaderSectionFragment;
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageName, manifest, sectionId) => {
                return (0, application_1.getObjectPageCustomHeaderSectionPath)(pageName, manifest, sectionId, 'position');
            },
            key: 'anchor'
        }
    }),
    (0, decorators_1.validity)({
        since: '1.77.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "relatedFacet", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (pageName, manifest, sectionId) => (0, application_1.getObjectPageCustomHeaderSectionPath)(pageName, manifest, sectionId, 'position'),
            key: 'placement'
        }
    }),
    (0, decorators_1.validity)({
        since: '1.77.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "relativePosition", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath
        },
        generate: common_1.addPatternForBindingChangeOfEnumOPV4
    }),
    (0, decorators_1.validity)({
        since: '1.84.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "visible", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.77.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "title", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.77.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "subTitle", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath,
            import: (manifestSection) => {
                // During import, we need to consider both `name` and `template` to correctly fill our config and to be upgrade safe
                return manifestSection.name || manifestSection.template;
            },
            key: 'template' // key: 'name' deprecated since '1.86'
        }
    }),
    (0, decorators_1.validity)({
        since: '1.77.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "fragmentName", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath,
            import: (manifestSection) => {
                return manifestSection.templateEdit;
            },
            key: 'templateEdit' // templateEdit deprecated since '1.86'
        }
    }),
    (0, decorators_1.validity)({
        since: '1.86.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "templateEdit", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.81.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "stashed", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.81.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "flexSettings", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.81.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "requestGroupId", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomHeaderSectionPath,
            import: false,
            export: false
        },
        xml: (config) => {
            return config['fragmentName'];
        }
    }),
    (0, decorators_1.validity)({
        since: '1.96.0'
    })
], ObjectPageCustomHeaderSectionFragment.prototype, "controls", void 0);
//# sourceMappingURL=ObjectPageCustomHeaderSection.js.map