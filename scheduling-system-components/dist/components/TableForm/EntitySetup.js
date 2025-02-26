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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntitySetup;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var yup = __importStar(require("yup"));
var validationSchemas_1 = require("../../schemas/validationSchemas");
var dataTypeProperties_1 = require("../../constants/dataTypeProperties");
var helpers_1 = require("../../helpers/helpers");
var useEntitySetup_1 = require("../../hooks/useEntitySetup");
function EntitySetup(_a) {
    var _this = this;
    var _b, _c;
    var configData = _a.configData, entityName = _a.entityName, setEntityName = _a.setEntityName, attributes = _a.attributes, setAttributes = _a.setAttributes, currentAttribute = _a.currentAttribute, setCurrentAttribute = _a.setCurrentAttribute, isCustomEntity = _a.isCustomEntity, setIsCustomEntity = _a.setIsCustomEntity, selectedEntity = _a.selectedEntity, setSelectedEntity = _a.setSelectedEntity, editingIndex = _a.editingIndex, setEditingIndex = _a.setEditingIndex, handleSaveEntity = _a.handleSaveEntity, resetForm = _a.resetForm, showToast = _a.showToast;
    var _d = (0, useEntitySetup_1.useEntitySetup)({
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
        showToast: showToast
    }), errors = _d.errors, setErrors = _d.setErrors, handleEntitySelect = _d.handleEntitySelect, handleEntityNameChange = _d.handleEntityNameChange, handleAttributeNameChange = _d.handleAttributeNameChange, handleDefaultValueChange = _d.handleDefaultValueChange, handleConstraintsChange = _d.handleConstraintsChange, handleValidationsChange = _d.handleValidationsChange, originalHandleAddAttribute = _d.handleAddAttribute;
    // Add button text based on edit state
    var addButtonText = editingIndex !== null ? 'Update Attribute' : 'Add Attribute';
    // Add state for input type
    var _e = (0, react_1.useState)(''), selectedInputType = _e[0], setSelectedInputType = _e[1];
    // Update state type
    var _f = (0, react_1.useState)([]), inputOptions = _f[0], setInputOptions = _f[1];
    var _g = (0, react_1.useState)(''), newOption = _g[0], setNewOption = _g[1];
    // Add validation errors state
    var _h = (0, react_1.useState)({}), validationErrors = _h[0], setValidationErrors = _h[1];
    // First, add a new state for select type
    var _j = (0, react_1.useState)(false), isMultiSelect = _j[0], setIsMultiSelect = _j[1];
    // Add this with other state declarations at the top
    var _k = (0, react_1.useState)(false), isDataTypeDisabled = _k[0], setIsDataTypeDisabled = _k[1];
    // Add handler for adding options
    var handleAddOption = function () { return __awaiter(_this, void 0, void 0, function () {
        var newOptionValue, newOptionObj, updatedOptions, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!newOption.trim()) return [3 /*break*/, 4];
                    newOptionValue = newOption.trim();
                    newOptionObj = { value: newOptionValue, label: newOptionValue };
                    updatedOptions = __spreadArray(__spreadArray([], inputOptions, true), [newOptionObj], false);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validationSchemas_1.enumValuesSchema.validate(updatedOptions)];
                case 2:
                    _a.sent();
                    setInputOptions(updatedOptions);
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { options: updatedOptions }));
                    setNewOption('');
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { options: undefined })); }); // Clear any previous options error
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    if (err_1 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { options: err_1.message })); });
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Add handler for removing options
    var handleRemoveOption = function (indexToRemove) {
        var _a;
        var updatedOptions = inputOptions.filter(function (_, index) { return index !== indexToRemove; });
        setInputOptions(updatedOptions);
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { options: ((_a = currentAttribute.options) === null || _a === void 0 ? void 0 : _a.filter(function (_, index) { return index !== indexToRemove; })) || [] }));
    };
    var handleInputTypeChange = function (e) {
        var inputType = e.target.value;
        setSelectedInputType(inputType);
        setErrors({});
        setInputOptions([]);
        var inputTypeConfig = configData.inputTypes[inputType];
        if (inputTypeConfig) {
            // For select/radio/checkbox types
            if (['select', 'radio', 'checkbox'].includes(inputType)) {
                setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: inputType, dataType: 'enum', size: null, precision: null, options: [], validations: {}, isMultiSelect: false }));
                setIsMultiSelect(false);
            }
            else {
                // For all other input types including gender
                setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: inputType, dataType: inputTypeConfig.dataType, size: inputTypeConfig.size || null, precision: inputTypeConfig.precision || null, options: inputTypeConfig.options || [], validations: {}, isMultiSelect: undefined }));
                if (inputTypeConfig.options) {
                    setInputOptions(inputTypeConfig.options);
                }
            }
            // Handle dataType disabling
            if (inputTypeConfig.isDataTypeFixed || ['select', 'radio', 'checkbox'].includes(inputType)) {
                setIsDataTypeDisabled(true);
            }
            else {
                setIsDataTypeDisabled(false);
            }
        }
    };
    // Update the radio button change handler
    var handleSelectTypeChange = function (isMulti) {
        setIsMultiSelect(isMulti);
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: 'select', isMultiSelect: isMulti // Just update the isMultiSelect flag
         }));
    };
    // Display options update
    {
        inputOptions.map(function (option, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between bg-gray-50 dark:bg-boxdark-2 p-2 rounded", children: [(0, jsx_runtime_1.jsx)("span", { children: option.label }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleRemoveOption(index); }, type: "button", className: "text-meta-1 hover:text-meta-1/80", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }) })] }, index)); });
    }
    // Update validateSize function
    var validateSize = function (size, dataType) { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
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
                    err_2 = _a.sent();
                    if (err_2 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { size: err_2.message })); });
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
                    // Add validation for negative values
                    if (numberValue && numberValue <= 0) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { size: 'Size must be greater than 0' })); });
                        return [2 /*return*/];
                    }
                    if (!currentAttribute.dataType) return [3 /*break*/, 3];
                    type_1 = currentAttribute.dataType.toLowerCase();
                    if (!(type_1 === 'char' || type_1 === 'varchar')) return [3 /*break*/, 1];
                    maxSize_1 = dataTypeProperties_1.maxSizes[type_1];
                    if (numberValue && numberValue > maxSize_1) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { size: "Maximum size for ".concat(type_1.toUpperCase(), " is ").concat(maxSize_1) })); });
                    }
                    else {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { size: undefined })); });
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
        var err_3;
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
                    err_3 = _a.sent();
                    if (err_3 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: err_3.message })); });
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
            value = e.target.value;
            numberValue = value ? Number(value) : null;
            setCurrentAttribute(__assign(__assign({}, currentAttribute), { precision: numberValue }));
            // Clear error if input is empty
            if (!value) {
                setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: undefined })); });
                return [2 /*return*/];
            }
            if (currentAttribute.dataType) {
                type_2 = currentAttribute.dataType.toLowerCase();
                limits_1 = dataTypeProperties_1.precisionLimits[type_2];
                // Special handling for decimal and numeric types
                if (type_2 === 'decimal' || type_2 === 'numeric') {
                    if (numberValue !== null && numberValue >= 0 && numberValue <= limits_1.max) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: undefined })); });
                    }
                    else {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: "Precision for ".concat(type_2.toUpperCase(), " must be between 0 and ").concat(limits_1.max) })); });
                    }
                }
                else if (limits_1 && numberValue !== null) {
                    if (numberValue >= limits_1.min && numberValue <= limits_1.max) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: undefined })); });
                    }
                    else {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { precision: "Precision for ".concat(type_2.toUpperCase(), " must be between ").concat(limits_1.min, " and ").concat(limits_1.max) })); });
                    }
                }
            }
            return [2 /*return*/];
        });
    }); };
    // Update handleDataTypeChange
    var handleDataTypeChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var newDataType, typeProps, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setErrors({});
                    newDataType = e.target.value.toLowerCase();
                    // If current input type is gender, prevent data type change
                    if (selectedInputType === 'gender') {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, validationSchemas_1.dataTypeSchema.validate(newDataType)];
                case 2:
                    _a.sent();
                    setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: undefined })); });
                    typeProps = dataTypeProperties_1.dataTypeProperties[newDataType] || { needsSize: false, needsPrecision: false };
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { dataType: newDataType, size: typeProps.needsSize ? currentAttribute.size : null, precision: typeProps.needsPrecision ? currentAttribute.precision : null, validations: {} // Clear validations when data type changes
                     }));
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    if (err_4 instanceof yup.ValidationError) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: err_4.message })); });
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Update validation change handler
    var handleValidationChange = function (e) {
        var _a;
        var validation = configData.validations
            .flatMap(function (g) { return g.validations; })
            .find(function (v) { return v.name === e.target.value; });
        if (validation) {
            setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: __assign(__assign({}, currentAttribute.validations), (_a = {}, _a[validation.name] = validation.hasValue ? '' : true, _a)) }));
            // Clear error when adding new validation
            setValidationErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[validation.name] = '', _a)));
            });
        }
    };
    // Update validation value change handler
    var handleValidationValueChange = function (key, value, validation) {
        var _a;
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: __assign(__assign({}, currentAttribute.validations), (_a = {}, _a[key] = value, _a)) }));
    };
    // Add clear validation errors function
    var clearValidationErrors = function () {
        setValidationErrors({});
    };
    // Update resetInputs to clear validation errors
    var resetInputs = function () {
        setSelectedInputType('');
        setInputOptions([]);
        setNewOption('');
        clearValidationErrors();
        setCurrentAttribute({
            name: '',
            dataType: '',
            size: null,
            precision: null,
            constraints: [],
            defaultValue: null,
            validations: {},
            options: [],
            inputType: 'text',
            isEditable: true,
            sortable: true
        });
    };
    // Remove duplicate handleConstraintsChange function
    (0, react_1.useEffect)(function () {
        if (editingIndex === null) {
            resetInputs();
        }
    }, [attributes]);
    // Add validation check before attribute add
    (0, react_1.useEffect)(function () {
        Object.entries(currentAttribute.validations).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            var validation = configData.validations
                .flatMap(function (g) { return g.validations; })
                .find(function (v) { return v.name === key; });
            if ((validation === null || validation === void 0 ? void 0 : validation.hasValue) && (value === '' || value === null || value === undefined)) {
                setValidationErrors(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[key] = "Value is required for ".concat(validation.label), _a)));
                });
            }
            else {
                setValidationErrors(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[key] = '', _a)));
                });
            }
        });
    }, [currentAttribute.validations]);
    // Update handleAddAttribute
    var handleAddAttribute = function () { return __awaiter(_this, void 0, void 0, function () {
        var hasErrors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Clear previous errors
                    setErrors({});
                    hasErrors = false;
                    // 1. Validate attribute name
                    if (!currentAttribute.name) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: "Attribute name is required" })); });
                        hasErrors = true;
                    }
                    // 2. Validate input type
                    if (!selectedInputType) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { inputType: "Input type is required" })); });
                        hasErrors = true;
                    }
                    // 3. Validate data type
                    if (!currentAttribute.dataType) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { dataType: "Data type is required" })); });
                        hasErrors = true;
                    }
                    // 4. Validate options for enum/select/radio/checkbox
                    if ((currentAttribute.dataType.toLowerCase() === 'enum' ||
                        ['radio', 'checkbox'].includes(selectedInputType)) &&
                        (!inputOptions || inputOptions.length === 0)) {
                        setErrors(function (prev) { return (__assign(__assign({}, prev), { options: "At least one option is required" })); });
                        hasErrors = true;
                    }
                    if (selectedInputType === 'select') {
                        setCurrentAttribute(__assign(__assign({}, currentAttribute), { isMultiSelect: isMultiSelect }));
                    }
                    if (hasErrors) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, originalHandleAddAttribute()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // Add this useEffect near other useEffects in EntitySetup
    (0, react_1.useEffect)(function () {
        // When editing an attribute, set the selectedInputType
        if (editingIndex !== null && currentAttribute.inputType) {
            setSelectedInputType(currentAttribute.inputType);
            // Also set input options if they exist
            if (currentAttribute.options) {
                setInputOptions(currentAttribute.options);
            }
        }
    }, [editingIndex, currentAttribute]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-stroke px-6.5 py-4 dark:border-strokedark", children: (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-xl text-black dark:text-white", children: "Entity Setup" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6.5 space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Select Entity ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: selectedEntity, onChange: function (e) { return handleEntitySelect(e.target.value); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select an entity" }), Object.keys(configData.entities).map(function (entity) { return ((0, jsx_runtime_1.jsx)("option", { value: entity, children: entity }, entity)); }), (0, jsx_runtime_1.jsx)("option", { value: "custom", children: "Create Custom Entity" })] })] }), (isCustomEntity || selectedEntity) && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Entity Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: entityName, onChange: handleEntityNameChange, className: "w-full rounded border-[1.5px] ".concat(errors.entityName ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter entity name" }), errors.entityName && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.entityName }))] })), (isCustomEntity || entityName) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Attribute Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: currentAttribute.name, onChange: handleAttributeNameChange, required: true, className: "w-full rounded border-[1.5px] ".concat(errors.attributeName ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter attribute name" }), errors.attributeName && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.attributeName }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Input Type", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: selectedInputType || 'text', onChange: handleInputTypeChange, className: "w-full rounded border-[1.5px] ".concat(errors.inputType ? 'border-meta-1' : 'border-stroke', " bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), children: [(0, jsx_runtime_1.jsx)("option", { value: "text", children: "Text" }), Object.entries(configData.inputTypes).map(function (_a) {
                                                var type = _a[0], config = _a[1];
                                                return ((0, jsx_runtime_1.jsxs)("option", { value: type, children: [type.charAt(0).toUpperCase() + type.slice(1), " (", config.htmlType, ")"] }, type));
                                            })] }), errors.inputType && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.inputType }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Data Type", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: currentAttribute.dataType, onChange: handleDataTypeChange, disabled: isDataTypeDisabled, className: "w-full rounded border-[1.5px] ".concat(errors.dataType ? 'border-meta-1' : 'border-stroke', " bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select data type" }), configData.dataTypes.map(function (type) { return ((0, jsx_runtime_1.jsx)("option", { value: type, children: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() }, type)); })] }), errors.dataType && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.dataType }))] }), selectedInputType === 'select' ? ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Select Type" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 mt-2", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", checked: !isMultiSelect, onChange: function () { return handleSelectTypeChange(false); }, className: "form-radio h-4 w-4 text-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm", children: "Single Select" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", checked: isMultiSelect, onChange: function () { return handleSelectTypeChange(true); }, className: "form-radio h-4 w-4 text-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm", children: "Multi Select" })] })] })] }) })) : null, (currentAttribute.dataType === 'enum' || ['radio', 'checkbox', 'select'].includes(selectedInputType)) && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Options ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 ".concat(errors.options ? 'border-meta-1' : ''), children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: newOption, onChange: function (e) {
                                                    setNewOption(e.target.value);
                                                    setErrors({});
                                                }, className: "flex-1 rounded border-[1.5px] ".concat(errors.options ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter option value" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddOption, type: "button", className: "inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90", children: "Add Option" })] }), inputOptions.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: inputOptions.map(function (option, index) { return ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 text-xs bg-primary/10 text-primary rounded flex items-center gap-1", children: [option.label, (0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleRemoveOption(index); }, className: "ml-1 hover:text-meta-1", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }) })] }, index)); }) })), errors.options && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.options }))] })), selectedInputType === 'range' && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Min Value" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.min || 0, onChange: function (e) { return setCurrentAttribute(__assign(__assign({}, currentAttribute), { min: Number(e.target.value) })); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Max Value" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.max || 100, onChange: function (e) { return setCurrentAttribute(__assign(__assign({}, currentAttribute), { max: Number(e.target.value) })); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Step" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.step || 1, onChange: function (e) { return setCurrentAttribute(__assign(__assign({}, currentAttribute), { step: Number(e.target.value) })); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none" })] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Size", (0, helpers_1.needsSizeValidation)(currentAttribute.dataType) &&
                                                        (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "number", min: "1", value: currentAttribute.size || '', onChange: handleSizeChange, disabled: !(0, helpers_1.needsSizeValidation)(currentAttribute.dataType), className: "w-full rounded border-[1.5px] ".concat(errors.size ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ").concat(!(0, helpers_1.needsSizeValidation)(currentAttribute.dataType) ? 'opacity-50' : ''), placeholder: (0, helpers_1.needsSizeValidation)(currentAttribute.dataType) ? 'Enter size' : 'Not applicable' }), errors.size && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.size }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Precision", (0, helpers_1.needsPrecision)(currentAttribute.dataType) &&
                                                        (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: (_b = currentAttribute.precision) !== null && _b !== void 0 ? _b : '', onChange: handlePrecisionChange, disabled: !(0, helpers_1.needsPrecision)(currentAttribute.dataType), className: "w-full rounded border-[1.5px] ".concat(errors.precision ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ").concat(!(0, helpers_1.needsPrecision)(currentAttribute.dataType) ? 'opacity-50' : ''), placeholder: (0, helpers_1.needsPrecision)(currentAttribute.dataType) ? 'Enter precision' : 'Not applicable' }), errors.precision && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.precision }))] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Constraints" }), (0, jsx_runtime_1.jsxs)("select", { value: currentAttribute.constraints[0] || '', onChange: handleConstraintsChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select constraint" }), configData.constraints.map(function (constraint) {
                                                var isDisabled = constraint === 'primary key' && (0, helpers_1.isPrimaryKeyExists)(attributes, editingIndex);
                                                return ((0, jsx_runtime_1.jsx)("option", { value: constraint, disabled: isDisabled, className: isDisabled ? dataTypeProperties_1.disabledOptionClass : '', title: constraint === 'primary key' ? "There can be only one primary key in a table" : "", children: constraint.split(' ').map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); }).join(' ') }, constraint));
                                            })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Default Value" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: currentAttribute.defaultValue || '', onChange: handleDefaultValueChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", placeholder: "Enter default value" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Validations" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: (0, jsx_runtime_1.jsxs)("select", { value: "", onChange: handleValidationChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Add validation" }), (_c = configData.validations
                                                            .find(function (g) { return g.group === "General"; })) === null || _c === void 0 ? void 0 : _c.validations.map(function (validation) { return ((0, jsx_runtime_1.jsx)("option", { value: validation.name, children: validation.label }, validation.name)); }), currentAttribute.dataType && (function () {
                                                            var _a;
                                                            var typeValidations = (_a = configData.validations
                                                                .find(function (g) {
                                                                switch (currentAttribute.dataType.toLowerCase()) {
                                                                    case 'varchar':
                                                                    case 'char':
                                                                    case 'text':
                                                                        return g.group === "String";
                                                                    case 'integer':
                                                                    case 'decimal':
                                                                    case 'numeric':
                                                                    case 'real':
                                                                    case 'double precision':
                                                                        return g.group === "Number";
                                                                    case 'boolean':
                                                                        return g.group === "Boolean";
                                                                    case 'date':
                                                                        return g.group === "Date";
                                                                    case 'timestamp':
                                                                    case 'time':
                                                                    default:
                                                                        return false;
                                                                }
                                                            })) === null || _a === void 0 ? void 0 : _a.validations;
                                                            return typeValidations === null || typeValidations === void 0 ? void 0 : typeValidations.map(function (validation) { return ((0, jsx_runtime_1.jsx)("option", { value: validation.name, children: validation.label }, validation.name)); });
                                                        })()] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-2", children: Object.entries(currentAttribute.validations).map(function (_a) {
                                                    var key = _a[0], value = _a[1];
                                                    var validation = configData.validations
                                                        .flatMap(function (g) { return g.validations; })
                                                        .find(function (v) { return v.name === key; });
                                                    if (!validation)
                                                        return null;
                                                    // Get the appropriate label based on input type
                                                    var validationLabel = (function () {
                                                        if (currentAttribute.inputType === 'date' && ['min', 'max'].includes(validation.name)) {
                                                            return validation.name === 'min' ? 'Min Date' : 'Max Date';
                                                        }
                                                        return validation.label;
                                                    })();
                                                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between w-full bg-gray-50 dark:bg-boxdark-2 p-2 rounded border border-stroke dark:border-strokedark", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 flex-grow", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: validationLabel }), validation.hasValue && ((0, jsx_runtime_1.jsx)("input", { type: (function () {
                                                                                    if (validation.valueType === 'date' ||
                                                                                        (currentAttribute.inputType === 'date' && ['min', 'max'].includes(validation.name))) {
                                                                                        return 'date';
                                                                                    }
                                                                                    if (validation.valueType === 'number') {
                                                                                        return 'number';
                                                                                    }
                                                                                    return 'text';
                                                                                })(), value: value || '', onChange: function (e) {
                                                                                    var newValue;
                                                                                    if (currentAttribute.inputType === 'date' && ['min', 'max'].includes(validation.name)) {
                                                                                        // Format date value as YYYY-MM-DD
                                                                                        var date = new Date(e.target.value);
                                                                                        newValue = date.toISOString().split('T')[0];
                                                                                    }
                                                                                    else {
                                                                                        newValue = validation.valueType === 'number' ?
                                                                                            Number(e.target.value) : e.target.value;
                                                                                    }
                                                                                    handleValidationValueChange(key, newValue, validation);
                                                                                }, className: "flex-1 rounded border-[1.5px] ".concat(validationErrors[key] ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-1 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: (function () {
                                                                                    if (validation.valueType === 'date' ||
                                                                                        (currentAttribute.inputType === 'date' && ['min', 'max'].includes(validation.name))) {
                                                                                        return 'Select date';
                                                                                    }
                                                                                    return validation.valueType === 'number' ? '0' : 'Enter value';
                                                                                })() }))] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () {
                                                                            var _a = currentAttribute.validations, _b = key, _ = _a[_b], restValidations = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                                                                            setCurrentAttribute(__assign(__assign({}, currentAttribute), { validations: restValidations }));
                                                                            // Clear error when removing validation
                                                                            setValidationErrors(function (prev) {
                                                                                var _a = prev, _b = key, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
                                                                                return rest;
                                                                            });
                                                                        }, className: "text-meta-1 hover:text-meta-1/80 p-1 ml-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }) })] }), validationErrors[key] && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1 ml-2", children: validationErrors[key] }))] }, key));
                                                }) })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddAttribute, className: "flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90", children: addButtonText })] }))] })] }));
}
