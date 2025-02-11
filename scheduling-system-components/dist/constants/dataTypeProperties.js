"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disabledOptionClass = exports.precisionLimits = exports.maxSizes = exports.dataTypeProperties = void 0;
// Helper to determine which data types need size/precision
exports.dataTypeProperties = {
    // Character types with size
    char: { needsSize: true, needsPrecision: false },
    varchar: { needsSize: true, needsPrecision: false },
    text: { needsSize: false, needsPrecision: false },
    // Numeric types with precision
    decimal: { needsSize: false, needsPrecision: true },
    numeric: { needsSize: true, needsPrecision: true },
    // Time types with precision
    timestamp: { needsSize: false, needsPrecision: true },
    time: { needsSize: false, needsPrecision: true },
    interval: { needsSize: false, needsPrecision: true },
    date: { needsSize: false, needsPrecision: false },
    // Fixed size numeric types
    smallint: { needsSize: false, needsPrecision: false },
    integer: { needsSize: false, needsPrecision: false },
    bigint: { needsSize: false, needsPrecision: false },
    real: { needsSize: false, needsPrecision: false },
    'double precision': { needsSize: false, needsPrecision: false },
    serial: { needsSize: false, needsPrecision: false },
    boolean: { needsSize: false, needsPrecision: false },
    bytea: { needsSize: false, needsPrecision: false },
    enum: { needsSize: false, needsPrecision: false },
    point: { needsSize: false, needsPrecision: false },
    line: { needsSize: false, needsPrecision: false },
    lseg: { needsSize: false, needsPrecision: false },
    box: { needsSize: false, needsPrecision: false },
    path: { needsSize: false, needsPrecision: false },
    polygon: { needsSize: false, needsPrecision: false },
    circle: { needsSize: false, needsPrecision: false },
    cidr: { needsSize: false, needsPrecision: false },
    inet: { needsSize: false, needsPrecision: false },
    macaddr: { needsSize: false, needsPrecision: false },
    uuid: { needsSize: false, needsPrecision: false },
    json: { needsSize: false, needsPrecision: false },
    jsonb: { needsSize: false, needsPrecision: false },
    array: { needsSize: false, needsPrecision: false },
    range: { needsSize: false, needsPrecision: false },
    composite: { needsSize: false, needsPrecision: false },
    tsquery: { needsSize: false, needsPrecision: false },
    tsvector: { needsSize: false, needsPrecision: false }
};
exports.maxSizes = {
    char: 255, // Maximum size for CHAR
    varchar: 65535, // Maximum size for VARCHAR in most databases
};
exports.precisionLimits = {
    decimal: { min: 0, max: 1000 },
    numeric: { min: 0, max: 1000 },
    timestamp: { min: 0, max: 6 },
    time: { min: 0, max: 6 },
    interval: { min: 0, max: 6 }
};
exports.disabledOptionClass = "bg-meta-1/10 text-gray-500 dark:text-gray-400 cursor-not-allowed hover:bg-meta-1/20";
