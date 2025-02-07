import { Attribute, ConfigData, Entity } from '../interfaces/types';
export declare const formatArrayToString: (arr: string[] | undefined) => string;
export declare const initialAttributeState: Attribute;
export declare function fetchEntityConfig(): Promise<ConfigData>;
/**
 * Saves entity to backend API and generates corresponding routes
 * @param entity - The entity configuration to save
 * @returns Promise<Response> from the API
 */
export declare function saveEntity(entity: Entity): Promise<Response>;
