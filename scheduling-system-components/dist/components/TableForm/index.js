"use strict";
'use client';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TableForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hot_toast_1 = __importStar(require("react-hot-toast"));
var utilstableform_1 = require("../../utils/utilstableform");
var EntitySetup_1 = __importDefault(require("./EntitySetup"));
var EntityPreview_1 = __importDefault(require("./EntityPreview"));
var EntityRoutes_1 = __importDefault(require("./EntityRoutes"));
// Loading component shown while fetching initial data
var LoadingState = function () { return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen", children: (0, jsx_runtime_1.jsx)("div", { className: "text-lg", children: "Loading..." }) })); };
function TableForm() {
    var _this = this;
    // Configuration state
    var _a = (0, react_1.useState)(true), loading = _a[0], setLoading = _a[1];
    var _b = (0, react_1.useState)({
        entities: {},
        dataTypes: [],
        constraints: [],
        validations: []
    }), configData = _b[0], setConfigData = _b[1];
    // Form state management
    var _c = (0, react_1.useState)(""), entityName = _c[0], setEntityName = _c[1];
    var _d = (0, react_1.useState)([]), attributes = _d[0], setAttributes = _d[1];
    var _e = (0, react_1.useState)(utilstableform_1.initialAttributeState), currentAttribute = _e[0], setCurrentAttribute = _e[1];
    var _f = (0, react_1.useState)(false), isCustomEntity = _f[0], setIsCustomEntity = _f[1];
    var _g = (0, react_1.useState)(""), selectedEntity = _g[0], setSelectedEntity = _g[1];
    var _h = (0, react_1.useState)(null), editingIndex = _h[0], setEditingIndex = _h[1];
    // Load initial configuration data
    (0, react_1.useEffect)(function () {
        var loadConfig = function () { return __awaiter(_this, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, (0, utilstableform_1.fetchEntityConfig)()];
                    case 1:
                        data = _a.sent();
                        setConfigData(data);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error loading configuration:', error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadConfig();
    }, []);
    // Show loading state while fetching config
    if (loading) {
        return (0, jsx_runtime_1.jsx)(LoadingState, {});
    }
    // Reset form to initial state
    var resetForm = function () {
        setEntityName("");
        setAttributes([]);
        setCurrentAttribute(utilstableform_1.initialAttributeState);
        setIsCustomEntity(false);
        setSelectedEntity("");
    };
    // Handle entity save operation
    var handleSaveEntity = function () { return __awaiter(_this, void 0, void 0, function () {
        var trimmedEntityName, entity, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trimmedEntityName = entityName.trim();
                    // Validate required fields
                    if (!trimmedEntityName) {
                        react_hot_toast_1.default.error("Entity Name is required!");
                        return [2 /*return*/];
                    }
                    if (attributes.length === 0) {
                        react_hot_toast_1.default.error("At least one attribute is required!");
                        return [2 /*return*/];
                    }
                    entity = {
                        entityName: trimmedEntityName, // Use trimmed name
                        attributes: attributes
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, utilstableform_1.saveEntity)(entity)];
                case 2:
                    _a.sent();
                    react_hot_toast_1.default.success("Entity saved successfully!");
                    resetForm();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    react_hot_toast_1.default.error("Failed to save entity. Please try again.");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_hot_toast_1.Toaster, { position: "top-right" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-9 sm:grid-cols-2", children: [(0, jsx_runtime_1.jsx)(EntitySetup_1.default, { configData: configData, entityName: entityName, setEntityName: setEntityName, attributes: attributes, setAttributes: setAttributes, currentAttribute: currentAttribute, setCurrentAttribute: setCurrentAttribute, isCustomEntity: isCustomEntity, setIsCustomEntity: setIsCustomEntity, selectedEntity: selectedEntity, setSelectedEntity: setSelectedEntity, editingIndex: editingIndex, setEditingIndex: setEditingIndex, handleSaveEntity: handleSaveEntity, resetForm: resetForm }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-9", children: [(0, jsx_runtime_1.jsx)(EntityPreview_1.default, { attributes: attributes, setAttributes: setAttributes, setCurrentAttribute: setCurrentAttribute, handleSaveEntity: handleSaveEntity, resetForm: resetForm, setEditingIndex: setEditingIndex, entityName: entityName }), (0, jsx_runtime_1.jsx)(EntityRoutes_1.default, { entityName: entityName })] })] })] }));
}
