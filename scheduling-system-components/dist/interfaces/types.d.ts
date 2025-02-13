export interface ValidationRules {
    required?: boolean;
    [key: string]: any;
}
export interface Attribute {
    name: string;
    dataType: string;
    inputType: string;
    size: number | null;
    precision: number | null;
    constraints: string[];
    defaultValue: string | null;
    validations: ValidationRules;
    options?: Array<{
        value: string;
        label: string;
    }>;
    config?: {
        accept?: string[];
        multiple?: boolean;
        maxSize?: number;
        placeholder?: string;
        format?: string;
        [key: string]: any;
    };
}
export interface Entity {
    entityName: string;
    attributes: Attribute[];
}
export interface ConfigData {
    entities: Record<string, any>;
    dataTypes: string[];
    constraints: string[];
    validations: string[];
}
