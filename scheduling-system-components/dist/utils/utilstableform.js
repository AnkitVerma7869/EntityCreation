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
exports.initialAttributeState = exports.formatArrayToString = void 0;
exports.fetchEntityConfig = fetchEntityConfig;
exports.saveEntity = saveEntity;
var routeGenerator_1 = require("../utils/routeGenerator");
// API endpoint from environment variables
var API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
// Helper function to convert array to comma-separated string
var formatArrayToString = function (arr) {
    return arr ? arr.join(', ') : '';
};
exports.formatArrayToString = formatArrayToString;
// Initial state for a new attribute
exports.initialAttributeState = {
    name: "",
    dataType: "",
    size: null,
    precision: null,
    constraints: [],
    defaultValue: null,
    validations: { required: false }
};
// Fetch entity configuration from JSON file
function fetchEntityConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/data/entityConfig.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch config');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
/**
 * Saves entity to backend API and generates corresponding routes
 * @param entity - The entity configuration to save
 * @returns Promise<Response> from the API
 */
function saveEntity(entity) {
    return __awaiter(this, void 0, void 0, function () {
        var transformedEntity, response, config, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transformedEntity = {
                        entityName: entity.entityName,
                        attributes: entity.attributes.map(function (attr) {
                            var _a, _b;
                            return ({
                                attributeName: attr.name,
                                dataType: attr.dataType.toLowerCase(),
                                size: attr.size,
                                precision: attr.precision,
                                constraints: attr.constraints,
                                defaultValue: attr.defaultValue || "",
                                validations: {
                                    required: attr.validations.required ||
                                        ((_a = attr.constraints) === null || _a === void 0 ? void 0 : _a.includes('not null')) ||
                                        ((_b = attr.constraints) === null || _b === void 0 ? void 0 : _b.includes('primary key')) ||
                                        false
                                }
                            });
                        })
                    };
                    console.log('Saving Entity:', transformedEntity);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/entity/create"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(transformedEntity),
                        })];
                case 1:
                    response = _a.sent();
                    console.log('Response:', response);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    config = {
                        entityName: entity.entityName,
                        attributes: entity.attributes
                    };
                    return [4 /*yield*/, (0, routeGenerator_1.generateTableRoutes)(config)];
                case 3:
                    _a.sent();
                    console.log('Routes generated successfully for:', entity.entityName);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error generating routes:', error_1);
                    throw new Error('Entity saved but failed to generate routes');
                case 5: return [2 /*return*/, response];
            }
        });
    });
}
