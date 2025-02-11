import { Entity } from '../../../interfaces/types';
import { generateListPage } from './pageComponents/listPageComp';
import { generateCreatePage } from './pageComponents/createPageComp';
import { generateEditPage } from './pageComponents/editPageComp';
import { generateViewPage } from './pageComponents/viewPageComp';

export const generatePages = (config: Entity) => ({
  list: generateListPage(config),
  create: generateCreatePage(config),
  edit: generateEditPage(config),
  view: generateViewPage(config)
});

// Export the generator functions
export {
  generateListPage,
  generateCreatePage, 
  generateEditPage,
  generateViewPage
};