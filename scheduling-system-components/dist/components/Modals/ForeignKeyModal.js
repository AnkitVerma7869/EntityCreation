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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var yup = __importStar(require("yup"));
var react_hook_form_1 = require("react-hook-form");
var yup_1 = require("@hookform/resolvers/yup");
// Define the validation schema
var schema = yup.object().shape({
    selectedTable: yup.string().required('Please select a referenced table'),
});
var ForeignKeyModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSelect = _a.onSelect, currentTable = _a.currentTable, initialValues = _a.initialValues;
    var _b = (0, react_1.useState)([]), entities = _b[0], setEntities = _b[1];
    var _c = (0, react_1.useState)(''), selectedTable = _c[0], setSelectedTable = _c[1];
    var _d = (0, react_1.useState)(''), selectedColumn = _d[0], setSelectedColumn = _d[1];
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(''), error = _f[0], setError = _f[1];
    var _g = (0, react_1.useState)({
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }), cascadeOptions = _g[0], setCascadeOptions = _g[1];
    // Initialize form with react-hook-form and yup
    var _h = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(schema)
    }), register = _h.register, handleSubmit = _h.handleSubmit, errors = _h.formState.errors, setValue = _h.setValue, reset = _h.reset;
    // API configuration
    var API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
    // Set initial values when modal opens
    (0, react_1.useEffect)(function () {
        if (isOpen && initialValues) {
            setSelectedTable(initialValues.table);
            setSelectedColumn(initialValues.column);
            // Initialize cascade options based on initial values
            setCascadeOptions({
                onDelete: initialValues.onDelete || '',
                onUpdate: initialValues.onUpdate || ''
            });
            setValue('selectedTable', initialValues.table, { shouldValidate: true });
        }
        else if (isOpen) {
            // When opening a new modal without initial values
            setCascadeOptions({
                onDelete: '',
                onUpdate: ''
            });
        }
    }, [isOpen, initialValues, setValue]);
    // Reset values when modal closes
    (0, react_1.useEffect)(function () {
        if (!isOpen) {
            setSelectedTable('');
            setSelectedColumn('');
            setCascadeOptions({
                onDelete: '',
                onUpdate: ''
            });
            reset();
        }
    }, [isOpen, reset]);
    (0, react_1.useEffect)(function () {
        var fetchEntities = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, result, filteredEntities, errorMessage, err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch("".concat(API_URL, "/api/v1/entity/all-entities"))];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _b.sent();
                        if (result.success) {
                            filteredEntities = (result.success.data || []).filter(function (entity) {
                                return entity.name !== currentTable &&
                                    !entity.name.startsWith('knex_') &&
                                    entity.name !== 'refresh_token';
                            });
                            setEntities(filteredEntities);
                            setError('');
                        }
                        else {
                            errorMessage = ((_a = result.error) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to fetch entities';
                            setError(errorMessage);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _b.sent();
                        setError('Failed to connect to the server. Please try again.');
                        console.error('Error fetching entities:', err_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        if (isOpen) {
            fetchEntities();
        }
    }, [isOpen, currentTable, API_URL]);
    var onSubmit = function (data) {
        var selectedEntity = entities.find(function (entity) { return entity.name === data.selectedTable; });
        if (selectedEntity) {
            onSelect(data.selectedTable, selectedColumn, cascadeOptions, selectedEntity.primarykeycolumndatatype);
        }
        onClose();
        reset();
    };
    // Handle table selection
    var handleTableSelect = function (e) {
        var tableName = e.target.value;
        setSelectedTable(tableName);
        setValue('selectedTable', tableName, { shouldValidate: true });
        // If a table is selected, automatically select the primary key column
        if (tableName) {
            var selectedEntity = entities.find(function (entity) { return entity.name === tableName; });
            if (selectedEntity) {
                setSelectedColumn(selectedEntity.primarykeycolumnname);
            }
        }
        else {
            setSelectedColumn('');
        }
    };
    var handleClose = function () {
        reset();
        onClose();
    };
    if (!isOpen)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white dark:bg-boxdark rounded-lg p-6 w-full max-w-md shadow-lg relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center mb-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-black dark:text-white", children: "Select Foreign Key Reference" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleClose, className: "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 24 }) })] }), loading ? ((0, jsx_runtime_1.jsx)("div", { className: "text-center py-4", children: "Loading..." })) : error ? ((0, jsx_runtime_1.jsx)("div", { className: "text-red-500 text-center py-4", children: error })) : ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "block text-sm font-medium text-black dark:text-white mb-1", children: ["Select Table ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsxs)("select", __assign({}, register('selectedTable'), { onChange: handleTableSelect, className: "w-full rounded border-[1.5px] ".concat(errors.selectedTable ? 'border-meta-1' : 'border-stroke', " bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"), children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Select a table" }), entities.map(function (entity) { return ((0, jsx_runtime_1.jsx)("option", { value: entity.name, children: entity.name }, entity.name)); })] })), errors.selectedTable && ((0, jsx_runtime_1.jsx)("p", { className: "text-meta-1 text-sm mt-1", children: errors.selectedTable.message }))] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("label", { className: "block text-sm font-medium text-black dark:text-white mb-1", children: ["Primary Key Column ", (0, jsx_runtime_1.jsx)("span", { className: "text-meta-1", children: "*" })] }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: selectedColumn, disabled: true, className: "w-full rounded border-[1.5px] border-stroke bg-gray-50 dark:bg-boxdark-2 px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "The primary key column is automatically selected based on the referenced table." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-black dark:text-white", children: "Cascade Options" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: cascadeOptions.onDelete === 'CASCADE', onChange: function (e) { return setCascadeOptions(function (prev) { return (__assign(__assign({}, prev), { onDelete: e.target.checked ? 'CASCADE' : '' })); }); }, className: "form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-black dark:text-white", children: "Cascade on Delete" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: cascadeOptions.onUpdate === 'CASCADE', onChange: function (e) { return setCascadeOptions(function (prev) { return (__assign(__assign({}, prev), { onUpdate: e.target.checked ? 'CASCADE' : '' })); }); }, className: "form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-black dark:text-white", children: "Cascade on Update" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-4 border-t border-stroke pt-4 dark:border-strokedark", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", onClick: handleClose, className: "btn btn-cancel", children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "btn", children: "Select" })] })] }))] }) }));
};
exports.default = ForeignKeyModal;
