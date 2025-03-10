import { Entity } from '../../../interfaces/types';
import { generateListPage } from './pageComponents/listPageComp';
import { generateCreatePage } from './pageComponents/createPageComp';
import { generateEditPage } from './pageComponents/editPageComp';
import { generateViewPage } from './pageComponents/viewPageComp';
export declare const generatePages: (config: Entity) => {
    list: string;
    create: string;
    edit: string;
    view: string;
};
export { generateListPage, generateCreatePage, generateEditPage, generateViewPage };
