import { Entity } from '../../../interfaces/types';
import { generateListPage } from './listPage';
import { generateCreatePage } from './createPage';
import { generateEditPage } from './editPage';
import { generateViewPage } from './viewPage';
export declare const generatePages: (config: Entity) => {
    list: string;
    create: string;
    edit: string;
    view: string;
};
export { generateListPage, generateCreatePage, generateEditPage, generateViewPage };
