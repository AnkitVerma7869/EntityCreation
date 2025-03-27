"use strict";
'use client';
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
exports.revalidate = exports.dynamic = void 0;
exports.default = TablesList;
var jsx_runtime_1 = require("react/jsx-runtime");
// Add ISR configuration
exports.dynamic = 'force-dynamic';
exports.revalidate = 1200; // Server-side revalidation only
/**
 * TableList Module
 * Provides a data grid interface for managing and viewing database tables
 */
var react_1 = require("react");
var x_data_grid_1 = require("@mui/x-data-grid");
var material_1 = require("@mui/material");
var navigation_1 = require("next/navigation");
var lucide_react_1 = require("lucide-react");
var react_hot_toast_1 = __importStar(require("react-hot-toast"));
/**
 * Custom loading overlay component for the data grid
 * Displays a spinning loader with loading message
 * @returns {JSX.Element} Loading overlay component
 */
var CustomLoadingOverlay = function () { return ((0, jsx_runtime_1.jsx)(x_data_grid_1.GridOverlay, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-black" }), (0, jsx_runtime_1.jsx)("p", { className: "text-black font-medium", children: "Loading Tables..." })] }) }) })); };
/**
 * Custom error overlay component for the data grid
 * Displays error messages with appropriate formatting
 * @param {Object} props - Component props
 * @param {string | null} props.message - Error message to display
 * @returns {JSX.Element} Error overlay component
 */
var CustomErrorOverlay = function (props) { return ((0, jsx_runtime_1.jsx)(x_data_grid_1.GridOverlay, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-center p-4", children: (0, jsx_runtime_1.jsx)("div", { className: "text-red-600 font-semibold", children: props.message === 'Failed to fetch'
                ? 'Unable to connect to server. Please check your connection.'
                : props.message }) }) })); };
/**
 * TablesList Component
 * Displays a data grid of database tables with their properties and configurations.
 * Features ISR for improved performance and data freshness.
 *
 * Features:
 * - Pagination
 * - Sorting
 * - Filtering
 * - Error handling
 * - Loading states
 *
 * @param {TableListProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
function TablesList(_a) {
    var _this = this;
    var initialData = _a.initialData, onCreateNew = _a.onCreateNew, token = _a.token;
    var router = (0, navigation_1.useRouter)();
    var searchParams = (0, navigation_1.useSearchParams)();
    var _b = (0, react_1.useState)([]), tables = _b[0], setTables = _b[1];
    var columns = (0, react_1.useState)([
        {
            field: 'name',
            headerName: 'Table Name',
            flex: 1,
            filterable: true,
            sortable: true,
            sortingOrder: ['asc', 'desc'],
        },
        {
            field: 'numberofcolumn',
            headerName: 'Total Fields',
            flex: 1,
            filterable: true,
            sortable: true,
            sortingOrder: ['asc', 'desc'],
        }
    ])[0];
    var _c = (0, react_1.useState)({
        pageSize: 10,
        page: 0,
    }), paginationModel = _c[0], setPaginationModel = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(null), apiError = _e[0], setApiError = _e[1];
    var API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
    var fetchTables = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, errorData, data, uniqueTables_1, sortedTables, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    setLoading(true);
                    setApiError(null);
                    if (!API_URL) {
                        setApiError('API URL is not configured');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch("".concat(API_URL, "/api/v1/entity/all-entities"), {
                            headers: {
                                'Authorization': "Bearer ".concat(token),
                                'Content-Type': 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    errorData = _a.sent();
                    setApiError(errorData.message || 'Failed to fetch data');
                    setTables([]);
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    if (data.error) {
                        setApiError(data.error);
                        setTables([]);
                        return [2 /*return*/];
                    }
                    // Process the data to remove duplicates and ensure proper formatting
                    if (data.success && Array.isArray(data.success.data)) {
                        uniqueTables_1 = new Map();
                        data.success.data.forEach(function (table) {
                            // Only add if we haven't seen this table name before
                            if (!uniqueTables_1.has(table.name)) {
                                uniqueTables_1.set(table.name, __assign(__assign({}, table), { id: table.name // Use table name as unique ID
                                 }));
                            }
                        });
                        sortedTables = Array.from(uniqueTables_1.values())
                            .sort(function (a, b) { return a.name.localeCompare(b.name); });
                        setTables(sortedTables);
                    }
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error('Error fetching tables:', error_1);
                    setApiError('Failed to fetch');
                    setTables([]);
                    return [3 /*break*/, 7];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchTables();
    }, [API_URL]);
    (0, react_1.useEffect)(function () {
        react_hot_toast_1.default.dismiss();
        // Check localStorage instead of query params
        var storedEntity = localStorage.getItem('newEntity');
        if (storedEntity) {
            var _a = JSON.parse(storedEntity), name_1 = _a.name, message = _a.message;
            // Show migration in progress toast
            react_hot_toast_1.default.success("Migration is in progress,You can see your table in few seconds in the table list...", { position: 'top-right', duration: 5000 });
            // Show success message after delay
            // if (message) {
            //   setTimeout(() => {
            //     toast.success(message);
            //   }, 5500);
            // }
            // Clear the stored data
            localStorage.removeItem('newEntity');
        }
    }, []); // Run once on component mount
    var refreshData = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTables()];
                case 1:
                    _a.sent();
                    router.refresh();
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)(react_hot_toast_1.Toaster, {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-800", children: "Available Tables" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-gray-600", children: "Manage your database tables and their configurations" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return router.push('/entities/create'); }, className: "px-4 py-2 bg-primary text-white rounded  transition-colors", children: "Add New" })] }), (0, jsx_runtime_1.jsx)(material_1.Paper, { elevation: 2, className: "p-4", children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                        width: '100%',
                        minHeight: '400px',
                        display: 'flex',
                        flexDirection: 'column'
                    }, children: (0, jsx_runtime_1.jsx)(x_data_grid_1.DataGrid, { rows: tables, columns: columns, paginationModel: paginationModel, onPaginationModelChange: setPaginationModel, pageSizeOptions: [10, 25, 50], loading: loading, disableRowSelectionOnClick: true, autoHeight: !loading, slots: {
                            toolbar: x_data_grid_1.GridToolbar,
                            loadingOverlay: CustomLoadingOverlay,
                            noRowsOverlay: apiError ? function () { return (0, jsx_runtime_1.jsx)(CustomErrorOverlay, { message: apiError }); } : undefined,
                        }, slotProps: {
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }, initialState: {
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                            sorting: {
                                sortModel: [{ field: 'name', sort: 'asc' }],
                            },
                        }, sortingOrder: ['asc', 'desc'], disableColumnMenu: true, sx: {
                            '& .MuiDataGrid-row': {
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            },
                            minHeight: '300px',
                            flex: 1,
                            '& .MuiDataGrid-main': {
                                minHeight: '300px'
                            }
                        } }) }) })] }));
}
