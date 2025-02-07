"use strict";
'use client';
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
exports.default = TablesList;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var x_data_grid_1 = require("@mui/x-data-grid");
var material_1 = require("@mui/material");
var navigation_1 = require("next/navigation");
/**
 * TablesList Component
 * Displays a data grid of database tables with their properties and configurations.
 * Allows users to view, sort, filter and navigate to individual table details.
 */
function TablesList(_a) {
    var _this = this;
    var onCreateNew = _a.onCreateNew;
    var router = (0, navigation_1.useRouter)();
    var _b = (0, react_1.useState)([]), tables = _b[0], setTables = _b[1];
    var _c = (0, react_1.useState)([]), columns = _c[0], setColumns = _c[1];
    var _d = (0, react_1.useState)({
        pageSize: 5,
        page: 0,
    }), paginationModel = _d[0], setPaginationModel = _d[1];
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    /**
     * Handles row click events by navigating to the detailed view of the selected table
     */
    var handleRowClick = function (params) {
        var entityName = params.row.entityName.toLowerCase();
        router.push("/".concat(entityName));
    };
    (0, react_1.useEffect)(function () {
        /**
         * Fetches table data from the API and formats it for display in the data grid
         */
        var fetchTables = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, dynamicColumns, formattedTables, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        setLoading(true);
                        return [4 /*yield*/, fetch('/api/tables')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        dynamicColumns = [
                            {
                                field: 'id',
                                headerName: 'ID',
                                width: 70,
                                filterable: true,
                            },
                            {
                                field: 'entityName',
                                headerName: 'Entity Name',
                                flex: 1,
                                filterable: true,
                                sortable: true,
                            },
                            {
                                field: 'totalFields',
                                headerName: 'Total Fields',
                                width: 120,
                                filterable: true,
                                sortable: true,
                            },
                            {
                                field: 'attributes',
                                headerName: 'Attributes',
                                flex: 2,
                                filterable: true,
                                sortable: true,
                                renderCell: function (params) { return ((0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden text-ellipsis", children: params.value })); },
                            }
                        ];
                        setColumns(dynamicColumns);
                        formattedTables = data.tables.map(function (table, index) { return ({
                            id: index + 1,
                            entityName: table.entityName,
                            totalFields: table.attributes.length,
                            attributes: table.attributes.map(function (attr) { return "".concat(attr.name, " (").concat(attr.dataType, ")"); }).join(', '),
                        }); });
                        setTables(formattedTables);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching tables:', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchTables();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-800", children: "Available Tables" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-gray-600", children: "Manage your database tables and their configurations" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return router.push('/entities/create'); }, className: "px-4 py-2 bg-blue-500 text-white rounded", children: "Add New" })] }), (0, jsx_runtime_1.jsx)(material_1.Paper, { elevation: 2, className: "p-4", children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { height: 400, width: '100%' }, children: (0, jsx_runtime_1.jsx)(x_data_grid_1.DataGrid, { rows: tables, columns: columns, paginationModel: paginationModel, onPaginationModelChange: setPaginationModel, pageSizeOptions: [5, 10, 25, 50], loading: loading, disableRowSelectionOnClick: true, onRowClick: handleRowClick, slots: { toolbar: x_data_grid_1.GridToolbar }, slotProps: {
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }, initialState: {
                            pagination: {
                                paginationModel: { pageSize: 5, page: 0 },
                            },
                            sorting: {
                                sortModel: [{ field: 'tableName', sort: 'asc' }],
                            },
                        }, sx: {
                            '& .MuiDataGrid-row': {
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                            },
                        } }) }) })] }));
}
