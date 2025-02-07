import { Entity } from '../../../interfaces/types';
import { generateListPage } from './listPage';
import { generateCreatePage } from './createPage';
import { generateEditPage } from './editPage';
import { generateViewPage } from './viewPage';

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