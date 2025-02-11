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
var dataTypeProperties_1 = require("../constants/dataTypeProperties");
var dataTypeProperties_2 = require("../constants/dataTypeProperties");
var useEntitySetup = function (_a) {
    var configData = _a.configData, entityName = _a.entityName, setEntityName = _a.setEntityName, attributes = _a.attributes, setAttributes = _a.setAttributes, currentAttribute = _a.currentAttribute, setCurrentAttribute = _a.setCurrentAttribute, setIsCustomEntity = _a.setIsCustomEntity, setSelectedEntity = _a.setSelectedEntity, editingIndex = _a.editingIndex, setEditingIndex = _a.setEditingIndex;
    var _b = (0, react_1.useState)({}), errors = _b[0], setErrors = _b[1];
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
    var handleDefaultValueChange = function (e) {
        var value = e.target.value;
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { defaultValue: value }));
    };
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
    var handleValidationsChange = function (e) {
        var value = e.target.value;
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: { required: value === 'required' } }));
    };
    var handleAddAttribute = function () { return __awaiter(void 0, void 0, void 0, function () {
        var duplicateAttr, trimmedAttribute_1, dataTypeProps, limits_1, type, nameValid, hasPrimaryKeyAlready, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    duplicateAttr = attributes.find(function (attr, index) {
                        return attr.name.toLowerCase() === currentAttribute.name.toLowerCase() &&
                            index !== editingIndex;
                    });
                    if (duplicateAttr) {
                        react_hot_toast_1.default.error("Attribute name \"".concat(currentAttribute.name, "\" already exists!"));
                        return [2 /*return*/];
                    }
                    setErrors({});
                    trimmedAttribute_1 = __assign(__assign({}, currentAttribute), { name: currentAttribute.name.trim(), defaultValue: ((_a = currentAttribute.defaultValue) === null || _a === void 0 ? void 0 : _a.trim()) || '' });
                    if (!trimmedAttribute_1.name) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: "Attribute name is required" })); });
                        return [2 /*return*/];
                    }
                    if (!trimmedAttribute_1.dataType) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: "Data type is required" })); });
                        return [2 /*return*/];
                    }
                    dataTypeProps = dataTypeProperties_1.dataTypeProperties[trimmedAttribute_1.dataType.toLowerCase()];
                    // Validate size
                    if (dataTypeProps === null || dataTypeProps === void 0 ? void 0 : dataTypeProps.needsSize) {
                        if (!trimmedAttribute_1.size) {
                            setErrors(function (prev) { return (__assign(__assign({}, prev), { size: "Size is required for ".concat(trimmedAttribute_1.dataType) })); });
                            return [2 /*return*/];
                        }
                        if (trimmedAttribute_1.size <= 0) {
                            setErrors(function (prev) { return (__assign(__assign({}, prev), { size: 'Size must be greater than 0' })); });
                            return [2 /*return*/];
                        }
                    }
                    // Validate precision
                    if (dataTypeProps === null || dataTypeProps === void 0 ? void 0 : dataTypeProps.needsPrecision) {
                        if (!trimmedAttribute_1.precision && trimmedAttribute_1.precision !== 0) {
                            setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: "Precision is required for ".concat(trimmedAttribute_1.dataType) })); });
                            return [2 /*return*/];
                        }
                        limits_1 = dataTypeProperties_2.precisionLimits[trimmedAttribute_1.dataType.toLowerCase()];
                        type = trimmedAttribute_1.dataType.toLowerCase();
                        // Special handling for decimal and numeric types
                        if (type === 'decimal' || type === 'numeric') {
                            if (trimmedAttribute_1.precision < 0 || trimmedAttribute_1.precision > limits_1.max) {
                                setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: "Precision for ".concat(trimmedAttribute_1.dataType, " must be between 0 and ").concat(limits_1.max) })); });
                                return [2 /*return*/];
                            }
                        }
                        else if (limits_1 && (trimmedAttribute_1.precision < limits_1.min || trimmedAttribute_1.precision > limits_1.max)) {
                            setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: "Precision for ".concat(trimmedAttribute_1.dataType, " must be between ").concat(limits_1.min, " and ").concat(limits_1.max) })); });
                            return [2 /*return*/];
                        }
                    }
                    return [4 /*yield*/, validateAttributeName(trimmedAttribute_1.name)];
                case 1:
                    nameValid = _b.sent();
                    if (!nameValid) {
                        return [2 /*return*/];
                    }
                    if (trimmedAttribute_1.constraints.includes('PRIMARY KEY')) {
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
                            return index === editingIndex ? trimmedAttribute_1 : attr;
                        }); });
                        setEditingIndex(null);
                        react_hot_toast_1.default.success("Attribute updated successfully!");
                    }
                    else {
                        setAttributes(function (prev) { return __spreadArray(__spreadArray([], prev, true), [trimmedAttribute_1], false); });
                        react_hot_toast_1.default.success("Attribute added successfully!");
                    }
                    setCurrentAttribute(utilstableform_1.initialAttributeState);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    if (error_1 instanceof yup.ValidationError) {
                        react_hot_toast_1.default.error(error_1.message);
                    }
                    else if (error_1 instanceof Error) {
                        react_hot_toast_1.default.error("Failed to add attribute: ".concat(error_1.message));
                    }
                    else {
                        react_hot_toast_1.default.error("An unexpected error occurred while adding the attribute");
                    }
                    console.error("Error in handleAddAttribute:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return {
        errors: errors,
        setErrors: setErrors,
        handleEntitySelect: handleEntitySelect,
        handleEntityNameChange: handleEntityNameChange,
        handleAttributeNameChange: handleAttributeNameChange,
        handleDefaultValueChange: handleDefaultValueChange,
        handleConstraintsChange: handleConstraintsChange,
        handleValidationsChange: handleValidationsChange,
        handleAddAttribute: handleAddAttribute
    };
};
exports.useEntitySetup = useEntitySetup;
