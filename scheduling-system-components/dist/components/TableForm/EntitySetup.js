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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
var ForeignKeyModal_1 = __importDefault(require("../Modals/ForeignKeyModal"));
var indexConfig_1 = require("../../constants/indexConfig");
// Add this function before the EntitySetup component
var getIndexConfigForDataType = function (dataType) {
    return indexConfig_1.indexConfigurations.find(function (config) { return config.dataType.toLowerCase() === dataType.toLowerCase(); });
};
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
    }), errors = _d.errors, setErrors = _d.setErrors, originalHandleEntitySelect = _d.handleEntitySelect, handleEntityNameChange = _d.handleEntityNameChange, handleDefaultValueChange = _d.handleDefaultValueChange, originalHandleConstraintsChange = _d.handleConstraintsChange, handleValidationsChange = _d.handleValidationsChange, originalHandleAddAttribute = _d.handleAddAttribute;
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
    // Add this state to track if options are editable
    var _l = (0, react_1.useState)(true), isOptionsEditable = _l[0], setIsOptionsEditable = _l[1];
    // Add reserved column names constant
    var RESERVED_COLUMNS = ['id', 'created_at', 'updated_at'];
    // Add state for foreign key modal
    var _m = (0, react_1.useState)(false), isForeignKeyModalOpen = _m[0], setIsForeignKeyModalOpen = _m[1];
    // Add state for primary key information
    var _o = (0, react_1.useState)(null), primaryKeyInfo = _o[0], setPrimaryKeyInfo = _o[1];
    // Add state for foreign key data type
    var _p = (0, react_1.useState)(null), foreignKeyDataType = _p[0], setForeignKeyDataType = _p[1];
    var handleAttributeNameChange = function (e) {
        return RESERVED_COLUMNS.includes(e.target.value.toLowerCase())
            ? setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: "'".concat(e.target.value, "' is a reserved column name that will be auto-generated") })); })
            : (setCurrentAttribute(__assign(__assign({}, currentAttribute), { name: e.target.value })), setErrors(function (prev) { return (__assign(__assign({}, prev), { attributeName: undefined })); }));
    };
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
    // Update handleInputTypeChange
    var handleInputTypeChange = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var inputType, inputTypeConfig, isPredefinedEnum;
        return __generator(this, function (_a) {
            if (currentAttribute.constraints.includes('foreign key')) {
                showToast("Cannot change input type for foreign key fields", 'error');
                return [2 /*return*/];
            }
            inputType = e.target.value;
            setSelectedInputType(inputType);
            setErrors({});
            setInputOptions([]);
            inputTypeConfig = configData.inputTypes[inputType];
            if (inputTypeConfig) {
                isPredefinedEnum = inputType.endsWith('_enum');
                setIsOptionsEditable(!isPredefinedEnum);
                // Handle primary key input type changes
                if (currentAttribute.constraints.includes('primary key')) {
                    if (inputType === 'number') {
                        setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: inputType, dataType: 'integer', size: null, precision: null, options: [], validations: {}, isMultiSelect: false, defaultValue: null }));
                    }
                    else if (inputType === 'text') {
                        setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: inputType, dataType: 'varchar', size: null, precision: null, options: [], validations: {}, isMultiSelect: false, defaultValue: null }));
                    }
                    return [2 /*return*/];
                }
                if (['select', 'radio', 'checkbox'].includes(inputType)) {
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: inputType, dataType: 'enum', size: null, precision: null, options: [], validations: {}, isMultiSelect: false }));
                    setIsMultiSelect(false);
                    setIsDataTypeDisabled(true);
                }
                else {
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { inputType: inputType, dataType: inputTypeConfig.dataType, size: inputTypeConfig.size || null, precision: inputTypeConfig.precision || null, options: inputTypeConfig.options || [], validations: {}, isMultiSelect: undefined, enumType: inputType.endsWith('_enum') ? inputType : undefined }));
                    if (inputTypeConfig.options) {
                        setInputOptions(inputTypeConfig.options);
                    }
                    setIsDataTypeDisabled(false);
                }
            }
            return [2 /*return*/];
        });
    }); };
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
                    if (currentAttribute.constraints.includes('foreign key')) {
                        showToast("Cannot change data type for foreign key fields", 'error');
                        return [2 /*return*/];
                    }
                    setErrors({});
                    newDataType = e.target.value.toLowerCase();
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
                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { dataType: newDataType, size: typeProps.needsSize ? currentAttribute.size : null, precision: typeProps.needsPrecision ? currentAttribute.precision : null, validations: {} }));
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
    // Update resetInputs to ensure isDataTypeDisabled is false by default
    var resetInputs = function () {
        var defaultInputType = 'text';
        var defaultConfig = configData.inputTypes[defaultInputType];
        setSelectedInputType(defaultInputType);
        setInputOptions([]);
        setNewOption('');
        clearValidationErrors();
        setIsDataTypeDisabled(false); // Ensure this is false by default
        setPrimaryKeyInfo(null);
        setForeignKeyDataType(null);
        setCurrentAttribute({
            name: '',
            dataType: defaultConfig.dataType,
            size: defaultConfig.size || null,
            precision: defaultConfig.precision || null,
            constraints: [],
            defaultValue: null,
            validations: {},
            options: [],
            inputType: defaultInputType,
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
    // Add handler for foreign key selection
    var handleForeignKeySelect = function (selectedTable, selectedColumn, cascadeOptions, dataType) {
        var lowerDataType = dataType.toLowerCase();
        var inputType = lowerDataType === 'integer' ? 'number' : 'text';
        setCurrentAttribute(__assign(__assign({}, currentAttribute), { constraints: ['foreign key'], references: {
                table: selectedTable,
                column: selectedColumn,
                onDelete: cascadeOptions.onDelete,
                onUpdate: cascadeOptions.onUpdate
            }, dataType: lowerDataType, size: null, precision: null, inputType: inputType // Set input type based on data type
         }));
        setForeignKeyDataType(lowerDataType);
        setIsDataTypeDisabled(true);
        setSelectedInputType(inputType); // Update selected input type
        showToast("Foreign key reference set to ".concat(selectedTable, ".").concat(selectedColumn), 'success');
    };
    // Update handleConstraintsChange to only disable data type for specific constraints
    var handleConstraintsChange = function (e) {
        var value = e.target.value;
        if (value === 'primary key') {
            var hasPrimaryKeyAlready = attributes.some(function (attr, idx) {
                if (editingIndex !== null && idx === editingIndex)
                    return false;
                return attr.constraints.includes('primary key');
            });
            if (hasPrimaryKeyAlready) {
                showToast("Only one PRIMARY KEY constraint is allowed per table!", 'error');
                return;
            }
            // Set default input type and data type for primary key
            var defaultInputType = 'number';
            setSelectedInputType(defaultInputType);
            setCurrentAttribute(__assign(__assign({}, currentAttribute), { constraints: [value], inputType: defaultInputType, dataType: 'integer', size: null, precision: null, defaultValue: null // Reset default value
             }));
        }
        else if (value === 'foreign key') {
            setIsForeignKeyModalOpen(true);
            return;
        }
        else {
            setCurrentAttribute(__assign(__assign({}, currentAttribute), { constraints: value ? [value] : [] }));
        }
    };
    // Update handleEntitySelect to fetch primary key information
    var handleEntitySelect = function (value) {
        originalHandleEntitySelect(value);
        setPrimaryKeyInfo(null);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-stroke px-6.5 py-4 dark:border-strokedark", children: (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-xl text-black dark:text-white", children: "Entity Setup" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6.5 space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col bg-meta-9/30 dark:bg-boxdark-2 rounded-md p-2.5 border border-stroke dark:border-strokedark", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium text-black dark:text-white mb-2", children: "Reserved columns:" }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2", children: RESERVED_COLUMNS.map(function (col, index) { return ((0, jsx_runtime_1.jsx)("code", { className: "inline-flex px-2.5 py-1 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded text-primary dark:text-white font-mono text-xs whitespace-nowrap shadow-sm", children: col }, col)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Select Entity ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: selectedEntity, onChange: function (e) { return handleEntitySelect(e.target.value); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select an entity" }), Object.keys(configData.entities).map(function (entity) { return ((0, jsx_runtime_1.jsx)("option", { value: entity, children: entity }, entity)); }), (0, jsx_runtime_1.jsx)("option", { value: "custom", children: "Create Custom Entity" })] })] }), (isCustomEntity || selectedEntity) && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Entity Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: entityName, onChange: handleEntityNameChange, className: "w-full rounded border-[1.5px] ".concat(errors.entityName ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter entity name" }), errors.entityName && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.entityName }))] })), (isCustomEntity || entityName) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Attribute Name ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: currentAttribute.name, onChange: handleAttributeNameChange, required: true, className: "w-full rounded border-[1.5px] ".concat(errors.attributeName ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter attribute name" }), errors.attributeName && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.attributeName }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Input Type", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: selectedInputType || 'text', onChange: handleInputTypeChange, disabled: currentAttribute.constraints.includes('foreign key'), className: "w-full rounded border-[1.5px] ".concat(errors.inputType ? 'border-meta-1' : 'border-stroke', " bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select input type" }), Object.entries(configData.inputTypes).map(function (_a) {
                                                var type = _a[0], config = _a[1];
                                                var isPrimaryKeySelected = currentAttribute.constraints.includes('primary key');
                                                var allowedPrimaryKeyInputTypes = ['text', 'number'];
                                                // Only show valid options for primary key
                                                if (isPrimaryKeySelected && !allowedPrimaryKeyInputTypes.includes(type)) {
                                                    return null;
                                                }
                                                return ((0, jsx_runtime_1.jsxs)("option", { value: type, className: isPrimaryKeySelected && !allowedPrimaryKeyInputTypes.includes(type) ? dataTypeProperties_1.disabledOptionClass : '', children: [type.charAt(0).toUpperCase() + type.slice(1), " (", config.htmlType, ")"] }, type));
                                            })] }), errors.inputType && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.inputType })), currentAttribute.constraints.includes('primary key') && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Primary key only supports text and number input types" })), currentAttribute.constraints.includes('foreign key') && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Input type cannot be changed for foreign key fields" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Data Type", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", { value: currentAttribute.dataType, onChange: handleDataTypeChange, disabled: currentAttribute.constraints.includes('foreign key'), className: "w-full rounded border-[1.5px] ".concat(errors.dataType ? 'border-meta-1' : 'border-stroke', " bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select data type" }), configData.dataTypes.map(function (type) {
                                                var lowerType = type.toLowerCase();
                                                var isPrimaryKeySelected = currentAttribute.constraints.includes('primary key');
                                                // Handle primary key data type restrictions
                                                var isDisabled = false;
                                                if (isPrimaryKeySelected) {
                                                    if (selectedInputType === 'number') {
                                                        isDisabled = lowerType !== 'integer';
                                                    }
                                                    else if (selectedInputType === 'text') {
                                                        isDisabled = !['varchar', 'uuid'].includes(lowerType);
                                                    }
                                                    else {
                                                        isDisabled = true;
                                                    }
                                                }
                                                // Only show relevant options for primary key based on input type
                                                if (isPrimaryKeySelected) {
                                                    if (selectedInputType === 'number' && lowerType !== 'integer')
                                                        return null;
                                                    if (selectedInputType === 'text' && !['varchar', 'uuid'].includes(lowerType))
                                                        return null;
                                                }
                                                return ((0, jsx_runtime_1.jsx)("option", { value: type, disabled: isDisabled, className: isDisabled ? dataTypeProperties_1.disabledOptionClass : '', children: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase() }, type));
                                            })] }), errors.dataType && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.dataType })), currentAttribute.constraints.includes('primary key') && selectedInputType === 'number' && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Primary key with number input type only supports INTEGER data type" })), currentAttribute.constraints.includes('primary key') && selectedInputType === 'text' && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Primary key with text input type only supports VARCHAR and UUID data types" })), foreignKeyDataType && currentAttribute.constraints.includes('foreign key') && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: ["Foreign key data type is set to ", foreignKeyDataType] }))] }), selectedInputType === 'select' ? ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Select Type" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 mt-2", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", checked: !isMultiSelect, onChange: function () { return handleSelectTypeChange(false); }, className: "form-radio h-4 w-4 text-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm", children: "Single Select" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", checked: isMultiSelect, onChange: function () { return handleSelectTypeChange(true); }, className: "form-radio h-4 w-4 text-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm", children: "Multi Select" })] })] })] }) })) : null, (currentAttribute.dataType === 'enum' || ['radio', 'checkbox', 'select'].includes(selectedInputType)) && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Options ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), isOptionsEditable ? (
                                    // Show input and add button only if options are editable
                                    (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 ".concat(errors.options ? 'border-meta-1' : ''), children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: newOption, onChange: function (e) {
                                                    setNewOption(e.target.value);
                                                    setErrors({});
                                                }, className: "flex-1 rounded border-[1.5px] ".concat(errors.options ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), placeholder: "Enter option value" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddOption, type: "button", className: "inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90", children: "Add Option" })] })) : (
                                    // Show a message when using predefined enum
                                    (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-500 italic bg-gray-50 p-2 rounded", children: ["Using predefined options for ", selectedInputType] })), inputOptions.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: inputOptions.map(function (option, index) { return ((0, jsx_runtime_1.jsxs)("span", { className: "px-2 py-1 text-xs bg-primary/10 text-primary rounded flex items-center gap-1", children: [option.label, isOptionsEditable && ((0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleRemoveOption(index); }, className: "ml-1 hover:text-meta-1", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }) }))] }, index)); }) })), errors.options && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.options }))] })), selectedInputType === 'range' && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Min Value" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.min || 0, onChange: function (e) { return setCurrentAttribute(__assign(__assign({}, currentAttribute), { min: Number(e.target.value) })); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Max Value" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.max || 100, onChange: function (e) { return setCurrentAttribute(__assign(__assign({}, currentAttribute), { max: Number(e.target.value) })); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Step" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.step || 1, onChange: function (e) { return setCurrentAttribute(__assign(__assign({}, currentAttribute), { step: Number(e.target.value) })); }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none" })] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Size", (0, helpers_1.needsSizeValidation)(currentAttribute.dataType) &&
                                                        (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "number", min: "1", value: currentAttribute.size || '', onChange: handleSizeChange, disabled: !(0, helpers_1.needsSizeValidation)(currentAttribute.dataType) ||
                                                    (currentAttribute.constraints.includes('primary key') && currentAttribute.dataType.toLowerCase() !== 'varchar'), className: "w-full rounded border-[1.5px] ".concat(errors.size ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ").concat(!(0, helpers_1.needsSizeValidation)(currentAttribute.dataType) ||
                                                    (currentAttribute.constraints.includes('primary key') && currentAttribute.dataType.toLowerCase() !== 'varchar') ? 'opacity-50' : ''), placeholder: (0, helpers_1.needsSizeValidation)(currentAttribute.dataType) ? 'Enter size' : 'Not applicable' }), errors.size && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.size })), currentAttribute.constraints.includes('primary key') && currentAttribute.dataType.toLowerCase() !== 'varchar' && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Size cannot be set for primary key fields" })), currentAttribute.constraints.includes('primary key') && currentAttribute.dataType.toLowerCase() === 'varchar' && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Size is required for VARCHAR primary key" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: ["Precision", (0, helpers_1.needsPrecision)(currentAttribute.dataType) && !currentAttribute.constraints.includes('primary key') &&
                                                        (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: (_b = currentAttribute.precision) !== null && _b !== void 0 ? _b : '', onChange: handlePrecisionChange, disabled: !(0, helpers_1.needsPrecision)(currentAttribute.dataType) || currentAttribute.constraints.includes('primary key'), className: "w-full rounded border-[1.5px] ".concat(errors.precision ? 'border-meta-1' : 'border-stroke', " bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ").concat(!(0, helpers_1.needsPrecision)(currentAttribute.dataType) || currentAttribute.constraints.includes('primary key') ? 'opacity-50' : ''), placeholder: (0, helpers_1.needsPrecision)(currentAttribute.dataType) && !currentAttribute.constraints.includes('primary key') ? 'Enter precision' : 'Not applicable' }), errors.precision && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.precision })), currentAttribute.constraints.includes('primary key') && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Precision cannot be set for primary key fields" }))] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Constraints" }), (0, jsx_runtime_1.jsxs)("select", { value: currentAttribute.constraints[0] || '', onChange: handleConstraintsChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select constraint" }), configData.constraints.map(function (constraint) {
                                                var isDisabled = constraint === 'primary key' && (0, helpers_1.isPrimaryKeyExists)(attributes, editingIndex);
                                                return ((0, jsx_runtime_1.jsx)("option", { value: constraint, disabled: isDisabled, className: isDisabled ? dataTypeProperties_1.disabledOptionClass : '', title: constraint === 'primary key' ? "There can be only one primary key in a table" : "", children: constraint.split(' ').map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); }).join(' ') }, constraint));
                                            })] }), currentAttribute.constraints.includes('primary key') && ((0, jsx_runtime_1.jsx)("div", { className: "mt-2 p-2 bg-primary/10 text-primary rounded", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: currentAttribute.inputType === 'number'
                                                ? 'Primary key with number input type will use INTEGER data type automatically'
                                                : 'Primary key selected - size, precision, and default value are disabled' }) })), currentAttribute.constraints.includes('foreign key') && currentAttribute.references && ((0, jsx_runtime_1.jsx)("div", { className: "mt-2 p-2 bg-gray-50 dark:bg-boxdark-2 rounded border border-stroke dark:border-strokedark", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-start", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center mb-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium text-black dark:text-white", children: "Foreign Key Reference" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () {
                                                                            setIsForeignKeyModalOpen(true);
                                                                        }, className: "hover:text-primary", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Pencil, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () {
                                                                            // Reset all form fields to initial state
                                                                            var defaultInputType = 'text';
                                                                            var defaultConfig = configData.inputTypes[defaultInputType];
                                                                            setSelectedInputType(defaultInputType);
                                                                            setInputOptions([]);
                                                                            setNewOption('');
                                                                            clearValidationErrors();
                                                                            setIsDataTypeDisabled(false);
                                                                            setPrimaryKeyInfo(null);
                                                                            setForeignKeyDataType(null);
                                                                            setCurrentAttribute({
                                                                                name: currentAttribute.name, // Keep the name
                                                                                dataType: defaultConfig.dataType,
                                                                                size: defaultConfig.size || null,
                                                                                precision: defaultConfig.precision || null,
                                                                                constraints: [],
                                                                                defaultValue: null,
                                                                                validations: {},
                                                                                options: [],
                                                                                inputType: defaultInputType,
                                                                                isEditable: true,
                                                                                sortable: true
                                                                            });
                                                                            showToast('Foreign key reference removed', 'success');
                                                                        }, className: "hover:text-meta-1", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-black dark:text-white", children: ["References: ", (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: currentAttribute.references.table })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["Column: ", (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: currentAttribute.references.column })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-1", children: [currentAttribute.references.onDelete && ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs px-2 py-1 bg-primary/10 text-primary rounded", children: ["On Delete: ", currentAttribute.references.onDelete] })), currentAttribute.references.onUpdate && ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs px-2 py-1 bg-primary/10 text-primary rounded", children: ["On Update: ", currentAttribute.references.onUpdate] }))] })] }) }) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: (function () {
                                    var _a;
                                    var indexConfig = getIndexConfigForDataType(currentAttribute.dataType);
                                    if (!indexConfig || indexConfig.notIndexable) {
                                        return null; // Don't show anything for non-indexable types
                                    }
                                    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "isIndexed", checked: currentAttribute.isIndexed || false, onChange: function (e) {
                                                                var dataType = currentAttribute.dataType.toLowerCase();
                                                                var showLengthInput = ['varchar', 'char', 'text', 'json', 'jsonb', 'uuid'].includes(dataType);
                                                                setCurrentAttribute(__assign(__assign({}, currentAttribute), { isIndexed: e.target.checked, 
                                                                    // Set default index type and length when enabling index
                                                                    indexType: e.target.checked ? ((indexConfig === null || indexConfig === void 0 ? void 0 : indexConfig.defaultIndexType) || 'btree') : undefined, indexLength: e.target.checked && showLengthInput ? 10 : null }));
                                                            }, className: "form-checkbox h-4 w-4 text-primary rounded border-stroke" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "isIndexed", className: "text-sm font-medium text-black dark:text-white", children: "Create Index" })] }) }), currentAttribute.isIndexed && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Index Type" }), (0, jsx_runtime_1.jsx)("select", { value: currentAttribute.indexType || indexConfig.defaultIndexType, onChange: function (e) {
                                                                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { indexType: e.target.value }));
                                                                }, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: indexConfig.indexTypes.map(function (type) { return ((0, jsx_runtime_1.jsxs)("option", { value: type.type, title: type.description, children: [type.type.toUpperCase(), " ", type.recommended ? '(Recommended)' : ''] }, type.type)); }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 mt-1", children: (_a = indexConfig.indexTypes.find(function (t) { return t.type === currentAttribute.indexType; })) === null || _a === void 0 ? void 0 : _a.description })] }), ['varchar', 'char', 'text', 'json', 'jsonb', 'uuid'].includes(currentAttribute.dataType.toLowerCase()) && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Index Length" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: currentAttribute.indexLength === null ? '' : currentAttribute.indexLength, onChange: function (e) {
                                                                    var value = e.target.value === '' ? null : parseInt(e.target.value);
                                                                    var dataType = currentAttribute.dataType.toLowerCase();
                                                                    // Only check size constraint for varchar and char
                                                                    if (['varchar', 'char'].includes(dataType) && currentAttribute.size) {
                                                                        if (value && value > currentAttribute.size) {
                                                                            showToast("Index length cannot be greater than field size (".concat(currentAttribute.size, ")"), 'error');
                                                                            return;
                                                                        }
                                                                    }
                                                                    setCurrentAttribute(__assign(__assign({}, currentAttribute), { indexLength: value }));
                                                                }, onBlur: function (e) {
                                                                    // If the field is empty or invalid when losing focus, set to default 10
                                                                    if (!currentAttribute.indexLength) {
                                                                        setCurrentAttribute(__assign(__assign({}, currentAttribute), { indexLength: 10 }));
                                                                    }
                                                                }, min: "1", max: ['varchar', 'char'].includes(currentAttribute.dataType.toLowerCase()) ? currentAttribute.size || undefined : undefined, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", placeholder: "Enter index length" }), ['varchar', 'char'].includes(currentAttribute.dataType.toLowerCase()) && currentAttribute.size && ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-gray-500 mt-1", children: ["Maximum allowed length: ", currentAttribute.size] }))] }))] }))] }));
                                })() }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Default Value" }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: currentAttribute.defaultValue || '', onChange: handleDefaultValueChange, disabled: currentAttribute.constraints.includes('foreign key') || currentAttribute.constraints.includes('primary key'), className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", placeholder: "Enter default value" }), currentAttribute.constraints.includes('foreign key') && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Default value cannot be set for foreign key fields" })), currentAttribute.constraints.includes('primary key') && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Default value cannot be set for primary key fields" }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", children: "Validations" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: (0, jsx_runtime_1.jsxs)("select", { value: "", onChange: handleValidationChange, className: "w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary", children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Add validation" }), (_c = configData.validations
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
                                                }) })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleAddAttribute, className: "flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90", children: addButtonText })] }))] }), (0, jsx_runtime_1.jsx)(ForeignKeyModal_1.default, { isOpen: isForeignKeyModalOpen, onClose: function () { return setIsForeignKeyModalOpen(false); }, onSelect: handleForeignKeySelect, currentTable: entityName, initialValues: currentAttribute.references })] }));
}
