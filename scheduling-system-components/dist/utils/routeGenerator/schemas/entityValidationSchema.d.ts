import * as yup from 'yup';
import { Entity } from '../../../interfaces/types';
export declare function createEntityValidationSchema(config: Entity): yup.ObjectSchema<{
    [x: string]: {
        [x: string]: any;
        [x: number]: any;
        [x: symbol]: any;
    };
}, yup.AnyObject, {
    [x: string]: {
        [x: string]: any;
    };
}, "">;
export declare function getFormValidationSchema(config: Entity): string;
