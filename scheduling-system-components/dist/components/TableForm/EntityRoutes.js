"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EntityRoutes;
var jsx_runtime_1 = require("react/jsx-runtime");
function EntityRoutes(_a) {
    var entityName = _a.entityName;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-stroke px-6.5 py-4 dark:border-strokedark", children: (0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-xl text-black dark:text-white", children: "Entity Routes" }) }), (0, jsx_runtime_1.jsx)("div", { className: "p-6.5", children: entityName && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "rounded border border-stroke py-3 px-4 dark:border-strokedark", children: ["GET /api/", entityName.toLowerCase()] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded border border-stroke py-3 px-4 dark:border-strokedark", children: ["POST /api/", entityName.toLowerCase()] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded border border-stroke py-3 px-4 dark:border-strokedark", children: ["PUT /api/", entityName.toLowerCase(), "/[id]"] }), (0, jsx_runtime_1.jsxs)("div", { className: "rounded border border-stroke py-3 px-4 dark:border-strokedark", children: ["DELETE /api/", entityName.toLowerCase(), "/[id]"] })] })) })] }));
}
