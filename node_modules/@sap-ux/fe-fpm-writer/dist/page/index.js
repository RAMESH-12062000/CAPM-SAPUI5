"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateListReport = exports.generateObjectPage = exports.generateCustomPage = exports.validatePageConfig = void 0;
const common_1 = require("./common");
Object.defineProperty(exports, "validatePageConfig", { enumerable: true, get: function () { return common_1.validatePageConfig; } });
const custom_1 = require("./custom");
Object.defineProperty(exports, "generateCustomPage", { enumerable: true, get: function () { return custom_1.generate; } });
const object_1 = require("./object");
Object.defineProperty(exports, "generateObjectPage", { enumerable: true, get: function () { return object_1.generate; } });
const list_1 = require("./list");
Object.defineProperty(exports, "generateListReport", { enumerable: true, get: function () { return list_1.generate; } });
//# sourceMappingURL=index.js.map