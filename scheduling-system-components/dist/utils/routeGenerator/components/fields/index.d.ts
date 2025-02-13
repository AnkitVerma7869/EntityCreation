import { Entity } from '../../../../interfaces/types';
import { generateDateField } from './DateField';
import { generateSelectField } from './SelectField';
import { generateRichTextField } from './RichTextField';
import { generateFileField } from './FileField';
export declare function generateField(entity: Entity): string;
export { generateDateField, generateSelectField, generateRichTextField, generateFileField };
