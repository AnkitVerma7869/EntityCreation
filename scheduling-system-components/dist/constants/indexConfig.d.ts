export interface IndexTypeConfig {
    type: string;
    description: string;
    recommended: boolean;
}
export interface DataTypeIndexConfig {
    dataType: string;
    indexTypes: IndexTypeConfig[];
    defaultIndexType: string;
    notIndexable?: boolean;
}
export declare const indexConfigurations: DataTypeIndexConfig[];
