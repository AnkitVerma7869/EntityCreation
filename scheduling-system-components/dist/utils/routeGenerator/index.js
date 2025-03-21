"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTableRoutes = generateTableRoutes;
exports.generateRoutes = generateRoutes;
var createPageComp_1 = require("./pages/pageComponents/createPageComp");
var editPageComp_1 = require("./pages/pageComponents/editPageComp");
var listPageComp_1 = require("./pages/pageComponents/listPageComp");
var viewPageComp_1 = require("./pages/pageComponents/viewPageComp");
var storeGenerator_1 = require("./store/storeGenerator");
var schemaGenerator_1 = require("./utils/schemaGenerator");
/**
 * Generates and saves all necessary routes for a table
 * @param config - Configuration for the table including name and attributes
 * @returns Promise resolving to the API response
 */
function generateTableRoutes(config) {
    return __awaiter(this, void 0, void 0, function () {
        var routes, response, result, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    routes = {
                        pages: {
                            list: (0, listPageComp_1.generateListPage)(config),
                            create: (0, createPageComp_1.generateCreatePage)(config),
                            edit: (0, editPageComp_1.generateEditPage)(config),
                            view: (0, viewPageComp_1.generateViewPage)(config)
                        },
                        store: (_a = {},
                            _a["".concat(config.entityName.toLowerCase(), "Store.ts")] = (0, storeGenerator_1.generateEntityStore)(config),
                            _a),
                        schemas: (_b = {},
                            _b["".concat(config.entityName.toLowerCase(), "Schema.ts")] = (0, schemaGenerator_1.generateSchemaFile)(config),
                            _b)
                    };
                    return [4 /*yield*/, fetch('/api/generate-routes', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                entityName: config.entityName,
                                attributes: config.attributes,
                                routes: routes
                            }),
                        })];
                case 1:
                    response = _c.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _c.sent();
                    if (!result.success) {
                        throw new Error(result.error || 'Failed to generate routes');
                    }
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _c.sent();
                    console.error('Error generating routes:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function generateRoutes(config) {
    var _a, _b;
    return {
        pages: {
            list: (0, listPageComp_1.generateListPage)(config),
            create: (0, createPageComp_1.generateCreatePage)(config),
            edit: (0, editPageComp_1.generateEditPage)(config),
            view: (0, viewPageComp_1.generateViewPage)(config)
        },
        store: (_a = {},
            _a["".concat(config.entityName.toLowerCase(), "Store.ts")] = (0, storeGenerator_1.generateEntityStore)(config),
            _a),
        schemas: (_b = {},
            _b["".concat(config.entityName.toLowerCase(), "Schema.ts")] = (0, schemaGenerator_1.generateSchemaFile)(config),
            _b)
    };
}
