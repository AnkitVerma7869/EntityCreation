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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntitySetup;
var jsx_runtime_1 = require("react/jsx-runtime");
var yup = __importStar(require("yup"));
var validationSchemas_1 = require("../../schemas/validationSchemas");
var dataTypeProperties_1 = require("../../constants/dataTypeProperties");
var helpers_1 = require("../../helpers/helpers");
var useEntitySetup_1 = require("../../hooks/useEntitySetup");
function EntitySetup(props) {
    var _this = this;
    var configData = props.configData, entityName = props.entityName, setEntityName = props.setEntityName, attributes = props.attributes, setAttributes = props.setAttributes, currentAttribute = props.currentAttribute, setCurrentAttribute = props.setCurrentAttribute, isCustomEntity = props.isCustomEntity, setIsCustomEntity = props.setIsCustomEntity, selectedEntity = props.selectedEntity, setSelectedEntity = props.setSelectedEntity, editingIndex = props.editingIndex, setEditingIndex = props.setEditingIndex;
    var _a = (0, useEntitySetup_1.useEntitySetup)({
        configData: configData,
        entityName: entityName,
        setEntityName: setEntityName,
        attributes: attributes,
        setAttributes: setAttributes,
        currentAttribute: currentAttribute,
        setCurrentAttribute: setCurrentAttribute,
        setIsCustomEntity: setIsCustomEntity,
        setSelectedEntity: setSelectedEntity,
        editingIndex: editingIndex,
        setEditingIndex: setEditingIndex,
    }), errors = _a.errors, setErrors = _a.setErrors, handleEntitySelect = _a.handleEntitySelect, handleEntityNameChange = _a.handleEntityNameChange, handleAttributeNameChange = _a.handleAttributeNameChange, handleConstraintsChange = _a.handleConstraintsChange, handleValidationsChange = _a.handleValidationsChange, handleAddAttribute = _a.handleAddAttribute;
    // Add button text based on edit state
    var addButtonText = editingIndex !== null ? 'Update Attribute' : 'Add Attribute';
    // Update validateSize function
    var validateSize = function (size, dataType) { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, validationSchemas_1.sizeSchema.validate(size, { context: { dataType: dataType } })];
                case 1:
                    _a.sent();
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { size: undefined })); });
                    return [2 /*return*/, true];
                case 2:
                    err_1 = _a.sent();
                    if (err_1 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { size: err_1.message })); });
                    }
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Update handleSizeChange function
    var handleSizeChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var value, numberValue, type_1, maxSize_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = e.target.value;
                    numberValue = value ? Number(value) : null;
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { size: numberValue }));
                    // Clear error if input is empty
                    if (!value) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { size: undefined })); });
                        return [2 /*return*/];
                    }
                    if (!currentAttribute.dataType) return [3 /*break*/, 3];
                    type_1 = currentAttribute.dataType.toLowerCase();
                    if (!(type_1 === 'char' || type_1 === 'varchar')) return [3 /*break*/, 1];
                    maxSize_1 = dataTypeProperties_1.maxSizes[type_1];
                    if (numberValue && numberValue > 0 && numberValue <= maxSize_1) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { size: undefined })); });
                    }
                    else if (numberValue && numberValue > maxSize_1) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { size: "Maximum size for ".concat(type_1.toUpperCase(), " is ").concat(maxSize_1) })); });
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, validateSize(numberValue, currentAttribute.dataType)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Update validatePrecision function
    var validatePrecision = function (precision, dataType) { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, validationSchemas_1.precisionSchema.validate(precision, { context: { dataType: dataType } })];
                case 1:
                    _a.sent();
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: undefined })); });
                    return [2 /*return*/, true];
                case 2:
                    err_2 = _a.sent();
                    if (err_2 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: err_2.message })); });
                    }
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Update handlePrecisionChange function
    var handlePrecisionChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var value, numberValue, type_2, limits_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = e.target.value;
                    numberValue = value ? Number(value) : null;
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { precision: numberValue }));
                    // Clear error if input is empty
                    if (!value) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: undefined })); });
                        return [2 /*return*/];
                    }
                    if (!currentAttribute.dataType) return [3 /*break*/, 3];
                    type_2 = currentAttribute.dataType.toLowerCase();
                    limits_1 = dataTypeProperties_1.precisionLimits[type_2];
                    if (!(limits_1 && numberValue !== null)) return [3 /*break*/, 1];
                    if (numberValue >= limits_1.min && numberValue <= limits_1.max) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: undefined })); });
                    }
                    else {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: "Precision for ".concat(type_2.toUpperCase(), " must be between ").concat(limits_1.min, " and ").concat(limits_1.max) })); });
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, validatePrecision(numberValue, currentAttribute.dataType)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Update handleDataTypeChange to handle errors immediately
    var handleDataTypeChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var newDataType, typeProps, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newDataType = e.target.value.toLowerCase();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, validationSchemas_1.dataTypeSchema.validate(newDataType)];
                case 2:
                    _a.sent();
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: undefined })); });
                    typeProps = dataTypeProperties_1.dataTypeProperties[newDataType] || { needsSize: false, needsPrecision: false };
                    // Update current attribute
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { dataType: newDataType, size: typeProps.needsSize ? currentAttribute.size : null, precision: typeProps.needsPrecision ? currentAttribute.precision : null }));
                    if (!(typeProps.needsSize && currentAttribute.size)) return [3 /*break*/, 4];
                    return [4 /*yield*/, validateSize(currentAttribute.size, newDataType)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(typeProps.needsPrecision && currentAttribute.precision)) return [3 /*break*/, 6];
                    return [4 /*yield*/, validatePrecision(currentAttribute.precision, newDataType)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_3 = _a.sent();
                    if (err_3 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: err_3.message })); });
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-stroke px-6.5 py-4 dark:border-strokedark", children: (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-xl text-black dark:text-white", children: "Entity Setup" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6.5 space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Select Entity ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: selectedEntity, onChange: function (e) { return handleEntitySelect(e.target.value); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select an entity" }), Object.keys(configData.entities).map(function (entity) { return ((0, jsx_runtime_1.jsx)("option", { value: entity, children: entity }, entity)); }), (0, jsx_runtime_1.jsx)("option", { value: "custom", children: "Create Custom Entity" })] })] }), isCustomEntity && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Entity Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: entityName, onChange: handleEntityNameChange, className: "w-full rounded border-[1.5px] ".concat(errors.entityName ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter entity name" }), errors.entityName && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.entityName }))] })), (isCustomEntity || entityName) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Attribute Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: currentAttribute.name, onChange: handleAttributeNameChange, required: true, className: "w-full rounded border-[1.5px] ".concat(errors.attributeName ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter attribute name" }), errors.attributeName && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.attributeName }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Data Type ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: currentAttribute.dataType, onChange: handleDataTypeChange, className: "w-full rounded border-[1.5px] ".concat(errors.dataType ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select data type" }), configData.dataTypes.map(function (type) { return ((0, jsx_runtime_1.jsx)("option", { value: type, children: type }, type)); })] }), errors.dataType && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.dataType }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Size", ['char', 'varchar'].includes(currentAttribute.dataType.toLowerCase()) &&
                                                        (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.size || '', onChange: handleSizeChange, disabled: !(0, helpers_1.needsSizeValidation)(currentAttribute.dataType), className: "w-full rounded border-[1.5px] ".concat(errors.size ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ").concat(!(0, helpers_1.needsSizeValidation)(currentAttribute.dataType) ? 'opacity-50' : ''), placeholder: (0, helpers_1.getNumericTypeCategory)(currentAttribute.dataType) ? 'Optional size' : 'Size' }), errors.size && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.size }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Precision", (0, helpers_1.needsPrecision)(currentAttribute.dataType) &&
                                                        (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.precision || '', onChange: handlePrecisionChange, disabled: !(0, helpers_1.needsPrecision)(currentAttribute.dataType), className: "w-full rounded border-[1.5px] ".concat(errors.precision ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ").concat(!(0, helpers_1.needsPrecision)(currentAttribute.dataType) ? 'opacity-50' : ''), placeholder: (0, helpers_1.needsPrecision)(currentAttribute.dataType) ? 'Enter precision' : 'Not applicable' }), errors.precision && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.precision }))] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Constraints" }), (0, jsx_runtime_1.jsxs)("select", { value: currentAttribute.constraints[0] || '', onChange: handleConstraintsChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select constraint" }), configData.constraints.map(function (constraint) {
                                                var isDisabled = constraint === 'primary key' && (0, helpers_1.isPrimaryKeyExists)(attributes, editingIndex);
                                                return ((0, jsx_runtime_1.jsx)("option", { value: constraint, disabled: isDisabled, className: isDisabled ? dataTypeProperties_1.disabledOptionClass : '', title: constraint === 'primary key' ? "There can be only one primary key in a table" : "", children: constraint }, constraint));
                                            })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Default Value" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: currentAttribute.defaultValue || '', onChange: function (e) { return setCurrentAttribute(__assign(__assign({}, currentAttribute), { defaultValue: e.target.value })); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", placeholder: "Enter default value" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Validations" }), (0, jsx_runtime_1.jsxs)("select", { value: currentAttribute.validations.required ? 'required' : '', onChange: handleValidationsChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select validation" }), configData.validations.map(function (validation) { return ((0, jsx_runtime_1.jsx)("option", { value: validation, children: validation }, validation)); })] }), currentAttribute.validations.required && ((0, jsx_runtime_1.jsx)("div", { className: "mt-2 flex items-center gap-2", children: (0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 text-xs bg-primary/10 text-primary rounded flex items-center gap-1", children: ["Required", (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: { required: false } })); }, className: "ml-1 hover:text-meta-1", children: (0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), (0, jsx_runtime_1.jsx)("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] }) }))] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddAttribute, className: "flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90", children: addButtonText })] }))] })] }));
}
