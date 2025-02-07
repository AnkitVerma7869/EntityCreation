"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEntitySetup = void 0;
var react_1 = require("react");
var utilstableform_1 = require("../utils/utilstableform");
var yup = __importStar(require("yup"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var validationSchemas_1 = require("../schemas/validationSchemas");
/**
 * Custom hook for managing entity setup and configuration
 * Handles validation, state management, and operations for entity and attribute creation
 */
var useEntitySetup = function (_a) {
    var configData = _a.configData, entityName = _a.entityName, setEntityName = _a.setEntityName, attributes = _a.attributes, setAttributes = _a.setAttributes, currentAttribute = _a.currentAttribute, setCurrentAttribute = _a.setCurrentAttribute, setIsCustomEntity = _a.setIsCustomEntity, setSelectedEntity = _a.setSelectedEntity, editingIndex = _a.editingIndex, setEditingIndex = _a.setEditingIndex;
    // State for tracking validation errors
    var _b = (0, react_1.useState)({}), errors = _b[0], setErrors = _b[1];
    /**
     * Validates the entity name using Yup schema
     * @param name - The entity name to validate
     * @returns boolean indicating if validation passed
     */
    var validateEntityName = function (name) { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!name)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, validationSchemas_1.entityNameSchema.validate(name)];
                case 1:
                    _a.sent();
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { entityName: undefined })); });
                    return [2 /*return*/, true];
                case 2:
                    err_1 = _a.sent();
                    if (err_1 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { entityName: err_1.message })); });
                    }
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Validates the attribute name using Yup schema
     * @param name - The attribute name to validate
     * @returns boolean indicating if validation passed
     */
    var validateAttributeName = function (name) { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!name)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, validationSchemas_1.attributeNameSchema.validate(name)];
                case 1:
                    _a.sent();
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: undefined })); });
                    return [2 /*return*/, true];
                case 2:
                    err_2 = _a.sent();
                    if (err_2 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: err_2.message })); });
                    }
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Handles entity selection, either custom or predefined
     * Updates related states based on selection
     * @param selected - The selected entity name or "custom"
     */
    var handleEntitySelect = function (selected) {
        var _a;
        setSelectedEntity(selected);
        if (selected === "custom") {
            setIsCustomEntity(true);
            setEntityName("");
            setAttributes([]);
        }
        else if (selected) {
            setIsCustomEntity(false);
            setEntityName(selected);
            setAttributes(((_a = configData.entities[selected]) === null || _a === void 0 ? void 0 : _a.attributes) || []);
        }
        else {
            setIsCustomEntity(false);
            setEntityName("");
            setAttributes([]);
        }
    };
    /**
     * Handles entity name input changes and validates the new value
     * @param e - Change event from input field
     */
    var handleEntityNameChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = e.target.value;
                    setEntityName(value);
                    return [4 /*yield*/, validateEntityName(value)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * Handles attribute name input changes and validates the new value
     * @param e - Change event from input field
     */
    var handleAttributeNameChange = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = e.target.value;
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { name: value }));
                    return [4 /*yield*/, validateAttributeName(value)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * Handles changes to attribute constraints
     * Includes validation for primary key constraints
     * @param e - Change event from select field
     */
    var handleConstraintsChange = function (e) {
        var value = e.target.value;
        if (value === 'primary key') {
            var hasPrimaryKeyAlready = attributes.some(function (attr, idx) {
                if (editingIndex !== null && idx === editingIndex)
                    return false;
                return attr.constraints.includes('primary key');
            });
            if (hasPrimaryKeyAlready) {
                react_hot_toast_1.default.error("Only one PRIMARY KEY constraint is allowed per table!");
                return;
            }
        }
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { constraints: value ? [value] : [] }));
    };
    /**
     * Handles changes to attribute validations
     * Currently supports required/optional validation
     * @param e - Change event from select field
     */
    var handleValidationsChange = function (e) {
        var value = e.target.value;
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: { required: value === 'required' } }));
    };
    /**
     * Handles adding or updating attributes
     * Validates attribute data before adding/updating
     * Shows success/error messages via toast
     */
    var handleAddAttribute = function () { return __awaiter(void 0, void 0, void 0, function () {
        var nameValid, hasPrimaryKeyAlready;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setErrors({});
                    if (!currentAttribute.name) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: "Attribute name is required" })); });
                        return [2 /*return*/];
                    }
                    if (!currentAttribute.dataType) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: "Data type is required" })); });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, validateAttributeName(currentAttribute.name)];
                case 1:
                    nameValid = _a.sent();
                    if (!nameValid) {
                        return [2 /*return*/];
                    }
                    if (currentAttribute.constraints.includes('PRIMARY KEY')) {
                        hasPrimaryKeyAlready = attributes.some(function (attr, idx) {
                            if (editingIndex !== null && idx === editingIndex)
                                return false;
                            return attr.constraints.includes('PRIMARY KEY');
                        });
                        if (hasPrimaryKeyAlready) {
                            return [2 /*return*/];
                        }
                    }
                    if (editingIndex !== null) {
                        setAttributes(function (prev) { return prev.map(function (attr, index) {
                            return index === editingIndex ? currentAttribute : attr;
                        }); });
                        setEditingIndex(null);
                        react_hot_toast_1.default.success("Attribute updated successfully!");
                    }
                    else {
                        setAttributes(function (prev) { return __spreadArray(__spreadArray([], prev, true), [currentAttribute], false); });
                        react_hot_toast_1.default.success("Attribute added successfully!");
                    }
                    setCurrentAttribute(utilstableform_1.initialAttributeState);
                    return [2 /*return*/];
            }
        });
    }); };
    return {
        errors: errors,
        setErrors: setErrors,
        handleEntitySelect: handleEntitySelect,
        handleEntityNameChange: handleEntityNameChange,
        handleAttributeNameChange: handleAttributeNameChange,
        handleConstraintsChange: handleConstraintsChange,
        handleValidationsChange: handleValidationsChange,
        handleAddAttribute: handleAddAttribute
    };
};
exports.useEntitySetup = useEntitySetup;
