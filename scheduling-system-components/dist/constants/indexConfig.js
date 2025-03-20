"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexConfigurations = void 0;
exports.indexConfigurations = [
    {
        dataType: 'integer',
        indexTypes: [
            { type: 'btree', description: 'Best for sorting, range queries, and comparisons (<, >, =)', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'smallint',
        indexTypes: [
            { type: 'btree', description: 'Best for sorting, range queries, and comparisons (<, >, =)', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'bigint',
        indexTypes: [
            { type: 'btree', description: 'Best for sorting, range queries, and comparisons (<, >, =)', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'decimal',
        indexTypes: [
            { type: 'btree', description: 'Efficient for ORDER BY, BETWEEN, and numerical filtering', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'numeric',
        indexTypes: [
            { type: 'btree', description: 'Efficient for ORDER BY, BETWEEN, and numerical filtering', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'real',
        indexTypes: [
            { type: 'btree', description: 'Efficient for ORDER BY, BETWEEN, and numerical filtering', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'double precision',
        indexTypes: [
            { type: 'btree', description: 'Efficient for ORDER BY, BETWEEN, and numerical filtering', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'serial',
        indexTypes: [
            { type: 'btree', description: 'Auto-indexed as a primary key (auto-incrementing IDs)', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'char',
        indexTypes: [
            { type: 'btree', description: 'Best for sorting, LIKE queries', recommended: true },
            { type: 'hash', description: 'Faster for exact matches', recommended: false }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'varchar',
        indexTypes: [
            { type: 'btree', description: 'Best for sorting, LIKE queries', recommended: true },
            { type: 'hash', description: 'Faster for exact matches', recommended: false }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'text',
        indexTypes: [
            { type: 'btree', description: 'Best for sorting, LIKE queries', recommended: true },
            { type: 'hash', description: 'Faster for exact matches', recommended: false }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'bytea',
        indexTypes: [],
        defaultIndexType: '',
        notIndexable: true
    },
    {
        dataType: 'timestamp',
        indexTypes: [
            { type: 'btree', description: 'Used for ORDER BY, date filtering, and range searches', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'date',
        indexTypes: [
            { type: 'btree', description: 'Used for ORDER BY, date filtering, and range searches', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'interval',
        indexTypes: [
            { type: 'btree', description: 'Used for ORDER BY, date filtering, and range searches', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'boolean',
        indexTypes: [],
        defaultIndexType: '',
        notIndexable: true
    },
    {
        dataType: 'enum',
        indexTypes: [],
        defaultIndexType: '',
        notIndexable: true
    },
    {
        dataType: 'point',
        indexTypes: [
            { type: 'gist', description: 'Required for spatial lookups, ST_DWithin(), bounding box search', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'line',
        indexTypes: [
            { type: 'gist', description: 'Required for spatial lookups, ST_DWithin(), bounding box search', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'lseg',
        indexTypes: [
            { type: 'gist', description: 'Required for spatial lookups, ST_DWithin(), bounding box search', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'box',
        indexTypes: [
            { type: 'gist', description: 'Required for spatial lookups, ST_DWithin(), bounding box search', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'path',
        indexTypes: [
            { type: 'gist', description: 'Required for spatial lookups, ST_DWithin(), bounding box search', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'polygon',
        indexTypes: [
            { type: 'gist', description: 'Required for spatial lookups, ST_DWithin(), bounding box search', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'circle',
        indexTypes: [
            { type: 'gist', description: 'Required for spatial lookups, ST_DWithin(), bounding box search', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'cidr',
        indexTypes: [
            { type: 'gist', description: 'Best for IP range lookups', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'inet',
        indexTypes: [
            { type: 'gist', description: 'Best for IP range lookups', recommended: true }
        ],
        defaultIndexType: 'gist'
    },
    {
        dataType: 'macaddr',
        indexTypes: [
            { type: 'btree', description: 'Efficient for equality comparisons', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'uuid',
        indexTypes: [
            { type: 'btree', description: 'Best for unique key lookups', recommended: true }
        ],
        defaultIndexType: 'btree'
    },
    {
        dataType: 'json',
        indexTypes: [],
        defaultIndexType: '',
        notIndexable: true
    },
    {
        dataType: 'jsonb',
        indexTypes: [
            { type: 'gin', description: 'Best for querying JSON fields', recommended: true }
        ],
        defaultIndexType: 'gin'
    },
    {
        dataType: 'tsquery',
        indexTypes: [
            { type: 'gin', description: 'Best for full-text search', recommended: true },
            { type: 'gist', description: 'Better for ranking and complex search', recommended: false }
        ],
        defaultIndexType: 'gin'
    },
    {
        dataType: 'tsvector',
        indexTypes: [
            { type: 'gin', description: 'Best for full-text search', recommended: true },
            { type: 'gist', description: 'Better for ranking and complex search', recommended: false }
        ],
        defaultIndexType: 'gin'
    }
];
