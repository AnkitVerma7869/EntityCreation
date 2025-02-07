"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntityPreview;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var utilstableform_1 = require("../../utils/utilstableform");
var react_hot_toast_1 = require("react-hot-toast");
function EntityPreview(_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes, setCurrentAttribute = _a.setCurrentAttribute, handleSaveEntity = _a.handleSaveEntity, resetForm = _a.resetForm, setEditingIndex = _a.setEditingIndex;
    // Handle editing of an existing attribute
    var handleEditAttribute = function (index) {
        // Just load the attribute into the form
        setCurrentAttribute(attributes[index]);
        // Store the index being edited
        setEditingIndex(index);
    };
    // Handle deletion of an attribute
    var handleDeleteAttribute = function (index) {
        var attributeToDelete = attributes[index];
        // Check if deleting a primary key
        if (attributeToDelete.constraints.includes('PRIMARY KEY')) {
            react_hot_toast_1.toast.error("Warning: Deleting the primary key attribute!");
        }
        setAttributes(function (prev) { return prev.filter(function (_, i) { return i !== index; }); });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-stroke px-6.5 py-4 dark:border-strokedark", children: (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-xl text-black dark:text-white", children: "Entity Preview" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "p-6.5", children: [(0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full table-auto", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "bg-gray-2 text-left dark:bg-meta-4", children: [(0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Attribute Name" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Data Type" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Constraints" }), (0, jsx_runtime_1.jsx)("th", { className: "px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap", children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: attributes === null || attributes === void 0 ? void 0 : attributes.map(function (attr, index) { return ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-4 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]", children: attr.name }), (0, jsx_runtime_1.jsxs)("td", { className: "border-b border-[#eee] px-4 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]", children: [attr.dataType, attr.size && "(".concat(attr.size, ")"), attr.precision && "(".concat(attr.precision, ")")] }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-4 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]", children: (0, utilstableform_1.formatArrayToString)(attr.constraints) }), (0, jsx_runtime_1.jsx)("td", { className: "border-b border-[#eee] px-4 py-3 dark:border-strokedark", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleEditAttribute(index); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Pencil, { className: "h-4 w-4 hover:text-primary" }) }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return handleDeleteAttribute(index); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4 hover:text-meta-1" }) })] }) })] }, index)); }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4.5 flex flex-wrap gap-3", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleSaveEntity, className: "inline-flex items-center justify-center rounded bg-primary px-6 py-2 text-center font-medium text-white hover:bg-opacity-90", children: "Save Entity" }), (0, jsx_runtime_1.jsx)("button", { onClick: resetForm, className: "inline-flex items-center justify-center rounded btn btn-cancel px-6 py-2 text-center font-medium text-white hover:bg-opacity-90", children: "Cancel" })] })] })] }));
}
