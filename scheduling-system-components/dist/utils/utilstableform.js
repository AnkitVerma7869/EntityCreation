"use strict";
/**
 * Table Form Utilities Module
 * Provides helper functions for handling entity configuration and API interactions
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var routeGenerator_1 = require("./routeGenerator");
// API endpoint from environment variables
var API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
/**
 * Converts an array to a comma-separated string
 * Used for displaying array values in table cells
 *
 * @param {string[] | undefined} arr - Array to format
 * @returns {string} Comma-separated string
 */
var formatArrayToString = function (arr) {
    return arr ? arr.join(', ') : '';
};
exports.formatArrayToString = formatArrayToString;
/**
 * Default configuration for a new attribute
 * Provides sensible defaults for all attribute properties
 */
exports.initialAttributeState = {
    name: "",
    dataType: "",
    size: null,
    precision: null,
    constraints: [],
    defaultValue: null,
    validations: { required: false },
    inputType: 'text',
    isReadOnly: false,
    displayInList: true,
    references: undefined,
    isIndexed: false,
    indexLength: null
};
/**
 * Fetches entity configuration from JSON file
 * Contains input types, data types, and other configuration options
 *
 * @returns {Promise<ConfigData>} Entity configuration data
 * @throws {Error} If fetch fails
 */
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
 * Updates the sidebar routes through the API
 * @param entityName - Name of the entity to add to routes
 */
function updateSidebarRoutes(entityName) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/sidebar-routes', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ entityName: entityName }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update sidebar routes');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.success) {
                        throw new Error(data.error || 'Failed to update sidebar routes');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error updating sidebar routes:', error_1);
                    throw new Error('Failed to update sidebar routes');
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Saves entity configuration to backend API and generates corresponding routes
 *
 * Features:
 * - Transforms entity data to match API requirements
 * - Handles special input types (e.g., gender)
 * - Sets up validations and constraints
 * - Generates frontend routes
 * - Provides error handling
 *
 * @param {Entity} entity - Entity configuration to save
 * @param {string} token - Authentication token
 * @returns {Promise<{message: string, success: boolean}>} API response
 * @throws {Error} If API call or route generation fails
 */
function saveEntity(entity, token) {
    return __awaiter(this, void 0, void 0, function () {
        var configData_1, transformedEntity, response, responseData, routes, routeResponse, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fetchEntityConfig()];
                case 1:
                    configData_1 = _a.sent();
                    transformedEntity = {
                        entityName: entity.entityName,
                        attributes: entity.attributes.map(function (attr) {
                            var _a, _b, _c;
                            // Get input type configuration
                            var inputTypeConfig = configData_1 === null || configData_1 === void 0 ? void 0 : configData_1.inputTypes[attr.inputType];
                            // Handle special input types
                            var inputType = attr.inputType === 'gender' ? 'radio' : attr.inputType;
                            var isRadioType = inputType === 'radio';
                            return {
                                attributeName: attr.name,
                                inputType: inputType,
                                dataType: attr.dataType.toLowerCase(),
                                size: attr.size,
                                precision: attr.precision,
                                constraints: attr.constraints,
                                defaultValue: attr.defaultValue || "",
                                options: attr.inputType === 'gender' ? [
                                    { value: "male", label: "male" },
                                    { value: "female", label: "female" },
                                    { value: "others", label: "others" }
                                ] : attr.options,
                                isMultiSelect: isRadioType ? false : attr.isMultiSelect,
                                isEditable: attr.isEditable !== undefined ? attr.isEditable : true,
                                sortable: attr.sortable !== undefined ? attr.sortable : true,
                                // Add enumType to the transformed data
                                enumType: attr.inputType.endsWith('_enum') ? attr.inputType : undefined,
                                enumValues: attr.dataType.toLowerCase() === 'enum' ?
                                    (attr.inputType === 'gender' ? ['male', 'female', 'others'] :
                                        (_a = attr.options) === null || _a === void 0 ? void 0 : _a.map(function (opt) { return typeof opt === 'string' ? opt : opt.value; })) :
                                    undefined,
                                validations: __assign(__assign({}, attr.validations), { required: attr.validations.required ||
                                        ((_b = attr.constraints) === null || _b === void 0 ? void 0 : _b.includes('not null')) ||
                                        ((_c = attr.constraints) === null || _c === void 0 ? void 0 : _c.includes('primary key')) ||
                                        false }),
                                isReadOnly: attr.isReadOnly || false,
                                displayInList: attr.displayInList !== false,
                                references: attr.references,
                                isIndexed: attr.isIndexed || false,
                                indexLength: attr.indexLength || null
                            };
                        })
                    };
                    // Log transformed entity for debugging
                    console.log('Saving Entity:', transformedEntity);
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/v1/entity/create"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(token)
                            },
                            body: JSON.stringify(transformedEntity),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseData = _a.sent();
                    // Handle API errors
                    if ('error' in responseData) {
                        throw new Error(responseData.error.message);
                    }
                    routes = (0, routeGenerator_1.generateRoutes)(entity);
                    return [4 /*yield*/, fetch('/api/generate-routes', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                entityName: entity.entityName,
                                attributes: entity.attributes,
                                routes: routes
                            })
                        })];
                case 4:
                    routeResponse = _a.sent();
                    if (!routeResponse.ok) {
                        throw new Error('Failed to generate routes');
                    }
                    return [4 /*yield*/, updateSidebarRoutes(entity.entityName)];
                case 5:
                    _a.sent();
                    console.log('Routes generated successfully for:', entity.entityName);
                    return [2 /*return*/, {
                            message: responseData.success.message,
                            success: true
                        }];
                case 6:
                    error_2 = _a.sent();
                    throw error_2;
                case 7: return [2 /*return*/];
            }
        });
    });
}
