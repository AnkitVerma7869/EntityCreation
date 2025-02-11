"use strict";
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
exports.POST = POST;
var server_1 = require("next/server");
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, entityName, attributes, routes, appDir, baseDir, _b, _c, apiDir, _d, _e, storeDir, _f, _g, error_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, request.json()];
                case 1:
                    _a = _h.sent(), entityName = _a.entityName, attributes = _a.attributes, routes = _a.routes;
                    if (!entityName) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                success: false,
                                error: 'Table name is required'
                            }, { status: 400 })];
                    }
                    console.log("Executed CLI", entityName);
                    appDir = promises_1.default.access(path_1.default.join(process.cwd(), 'src'))
                        .then(function () { return path_1.default.join(process.cwd(), 'src'); })
                        .catch(function () { return process.cwd(); });
                    _c = (_b = path_1.default).join;
                    return [4 /*yield*/, appDir];
                case 2:
                    baseDir = _c.apply(_b, [_h.sent(), 'app', entityName.toLowerCase()]);
                    _e = (_d = path_1.default).join;
                    return [4 /*yield*/, appDir];
                case 3:
                    apiDir = _e.apply(_d, [_h.sent(), 'app', 'api', entityName.toLowerCase()]);
                    _g = (_f = path_1.default).join;
                    return [4 /*yield*/, appDir];
                case 4:
                    storeDir = _g.apply(_f, [_h.sent(), 'store']);
                    // Create directories
                    return [4 /*yield*/, Promise.all([
                            promises_1.default.mkdir(baseDir, { recursive: true }),
                            promises_1.default.mkdir(path_1.default.join(baseDir, 'create'), { recursive: true }),
                            promises_1.default.mkdir(path_1.default.join(baseDir, 'edit'), { recursive: true }),
                            promises_1.default.mkdir(path_1.default.join(baseDir, '[id]'), { recursive: true }),
                            promises_1.default.mkdir(apiDir, { recursive: true }),
                            promises_1.default.mkdir(path_1.default.join(apiDir, 'create'), { recursive: true }),
                            promises_1.default.mkdir(path_1.default.join(apiDir, 'edit'), { recursive: true }),
                            promises_1.default.mkdir(path_1.default.join(apiDir, '[id]'), { recursive: true }),
                            promises_1.default.mkdir(path_1.default.join(apiDir, 'delete'), { recursive: true }),
                            promises_1.default.mkdir(storeDir, { recursive: true })
                        ])];
                case 5:
                    // Create directories
                    _h.sent();
                    // Write all files
                    return [4 /*yield*/, Promise.all([
                            // Pages
                            promises_1.default.writeFile(path_1.default.join(baseDir, 'page.tsx'), routes.pages.list),
                            promises_1.default.writeFile(path_1.default.join(baseDir, 'create', 'page.tsx'), routes.pages.create),
                            promises_1.default.writeFile(path_1.default.join(baseDir, 'edit', 'page.tsx'), routes.pages.edit),
                            promises_1.default.writeFile(path_1.default.join(baseDir, '[id]', 'page.tsx'), routes.pages.view),
                            // API routes
                            promises_1.default.writeFile(path_1.default.join(apiDir, 'route.ts'), routes.api.list),
                            promises_1.default.writeFile(path_1.default.join(apiDir, 'create', 'route.ts'), routes.api.create),
                            promises_1.default.writeFile(path_1.default.join(apiDir, 'edit', 'route.ts'), routes.api.edit),
                            promises_1.default.writeFile(path_1.default.join(apiDir, '[id]', 'route.ts'), routes.api.view),
                            promises_1.default.writeFile(path_1.default.join(apiDir, 'delete', 'route.ts'), routes.api.delete),
                            // Store
                            promises_1.default.writeFile(path_1.default.join(storeDir, "".concat(entityName.toLowerCase(), "Store.ts")), routes.store["".concat(entityName.toLowerCase(), "Store.ts")])
                        ])];
                case 6:
                    // Write all files
                    _h.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ success: true })];
                case 7:
                    error_1 = _h.sent();
                    console.error('Error:', error_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            success: false,
                            error: 'Failed to generate routes'
                        }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
