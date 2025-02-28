/**
 * Data Type Properties Configuration
 * Defines properties and constraints for different SQL data types
 */
/**
 * Maps SQL data types to their size and precision requirements
 * @type {Record<string, { needsSize: boolean; needsPrecision: boolean }>}
 */
export declare const dataTypeProperties: Record<string, {
    needsSize: boolean;
    needsPrecision: boolean;
}>;
/**
 * Maximum allowed sizes for variable-length data types
 */
export declare const maxSizes: Record<string, number>;
/**
 * Precision limits for numeric and temporal data types
 */
export declare const precisionLimits: Record<string, {
    min: number;
    max: number;
}>;
export declare const disabledOptionClass = "bg-meta-1/10 text-gray-500 dark:text-gray-400 cursor-not-allowed hover:bg-meta-1/20";
