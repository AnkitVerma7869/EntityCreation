export interface ValidationRules {
    required?: boolean;
    [key: string]: any;
}
export interface Attribute {
    name: string;
    dataType: string;
    size: number | null;
    precision: number | null;
    constraints: string[];
    defaultValue: string | null;
    validations: ValidationRules;
    options?: Array<{
        value: string;
        label: string;
    }>;
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
