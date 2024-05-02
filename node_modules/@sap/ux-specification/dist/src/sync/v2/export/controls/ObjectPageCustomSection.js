"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectPageCustomSectionView = exports.ObjectPageCustomSectionFragment = exports.BaseCustomSection = void 0;
const ux_specification_types_1 = require("@sap/ux-specification-types");
const decorators_1 = require("../../../common/decoration/decorators");
const application_1 = require("../../application");
class BaseCustomSection {
}
exports.BaseCustomSection = BaseCustomSection;
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomSectionPath,
            export: false,
            import: (_manifest, sectionId) => {
                const sectionParts = sectionId.split('|');
                return sectionParts[2];
            }
        }
    }),
    (0, decorators_1.validity)({
        since: '1.52.0'
    })
], BaseCustomSection.prototype, "relatedFacet", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomSectionPath,
            export: false,
            import: (_manifest, sectionId) => {
                return sectionId.split('|')[0];
            }
        }
    }),
    (0, decorators_1.validity)({
        since: '1.52.0'
    })
], BaseCustomSection.prototype, "relativePosition", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: (entitySet, _manifest, sectionId) => (0, application_1.getObjectPageCustomSectionPath)(entitySet, {}, sectionId, ux_specification_types_1.ManifestSection.generic)
        }
    }),
    (0, decorators_1.validity)({
        since: '1.52.0'
    })
], BaseCustomSection.prototype, "title", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.52.0'
    })
], BaseCustomSection.prototype, "className", void 0);
class ObjectPageCustomSectionFragment extends BaseCustomSection {
}
exports.ObjectPageCustomSectionFragment = ObjectPageCustomSectionFragment;
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.52.0'
    })
], ObjectPageCustomSectionFragment.prototype, "fragmentName", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.52.0'
    })
], ObjectPageCustomSectionFragment.prototype, "type", void 0);
class ObjectPageCustomSectionView extends BaseCustomSection {
}
exports.ObjectPageCustomSectionView = ObjectPageCustomSectionView;
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.52.0'
    })
], ObjectPageCustomSectionView.prototype, "viewName", void 0);
__decorate([
    (0, decorators_1.syncRule)({
        manifest: {
            path: application_1.getObjectPageCustomSectionPath
        }
    }),
    (0, decorators_1.validity)({
        since: '1.52.0'
    })
], ObjectPageCustomSectionView.prototype, "type", void 0);
//# sourceMappingURL=ObjectPageCustomSection.js.map