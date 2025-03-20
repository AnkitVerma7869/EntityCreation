export interface ValidationRule {
    name: string;
    label: string;
    hasValue?: boolean;
    valueType?: 'string' | 'number' | 'date';
    isArray?: boolean;
    value?: any;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    nullable?: boolean;
}
export interface ValidationGroup {
    group: string;
    validations: ValidationRule[];
}
export interface ValidationRules {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    nullable?: boolean;
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
    min?: number | null;
    max?: number | null;
    step?: number | null;
    isEditable?: boolean;
    sortable?: boolean;
    config?: {
        accept?: string[];
        multiple?: boolean;
        maxSize?: number;
        placeholder?: string;
        format?: string;
        [key: string]: any;
    };
    isMultiSelect?: boolean;
    isReadOnly?: boolean;
    displayInList?: boolean;
    enumType?: string;
    references?: IReference;
    isIndexed?: boolean;
    indexLength?: number | null;
    indexType?: string;
}
export interface IReference {
    table: string;
    column: string;
    onDelete?: string;
    onUpdate?: string;
}
export interface Entity {
    entityName: string;
    attributes: Attribute[];
    references?: IReference[];
}
export interface ConfigData {
    entities: Record<string, any>;
    dataTypes: string[];
    constraints: string[];
    validations: ValidationGroup[];
    inputTypes: {
        [key: string]: {
            dataType: string;
            size?: number;
            precision?: number;
            htmlType: string;
            options?: Array<{
                value: string;
                label: string;
            }>;
            min?: number;
            max?: number;
            step?: number;
            isDataTypeFixed?: boolean;
            enumType?: string;
        };
    };
}
