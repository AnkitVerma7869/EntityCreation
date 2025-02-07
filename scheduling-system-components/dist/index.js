"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predefinedEntities = exports.saveTableConfig = exports.generateTableRoutes = exports.TableList = exports.TableForm = exports.ManageEntities = void 0;
// Components
var ManageEntities_1 = require("./components/ManageEntities");
Object.defineProperty(exports, "ManageEntities", { enumerable: true, get: function () { return __importDefault(ManageEntities_1).default; } });
var TableForm_1 = require("./components/TableForm");
Object.defineProperty(exports, "TableForm", { enumerable: true, get: function () { return __importDefault(TableForm_1).default; } });
var TableList_1 = require("./components/TableList");
Object.defineProperty(exports, "TableList", { enumerable: true, get: function () { return __importDefault(TableList_1).default; } });
// Utils
var routeGenerator_1 = require("./utils/routeGenerator");
Object.defineProperty(exports, "generateTableRoutes", { enumerable: true, get: function () { return routeGenerator_1.generateTableRoutes; } });
var tableGenerator_1 = require("./utils/tableGenerator");
Object.defineProperty(exports, "saveTableConfig", { enumerable: true, get: function () { return tableGenerator_1.saveTableConfig; } });
// Constants and Configurations
exports.predefinedEntities = {
    "User": [
        { name: "id", dataType: "uuid", constraints: "PRIMARY KEY" },
        { name: "username", dataType: "varchar", constraints: "UNIQUE NOT NULL" },
        { name: "email", dataType: "varchar", constraints: "UNIQUE NOT NULL" },
    ],
};
