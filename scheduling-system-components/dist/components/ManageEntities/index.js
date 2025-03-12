"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var TableList_1 = __importDefault(require("../TableList"));
var ManageEntities = function (_a) {
    var token = _a.token;
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gray-50 p-6", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto", children: (0, jsx_runtime_1.jsx)(TableList_1.default, { token: token }) }) }));
};
exports.default = ManageEntities;
