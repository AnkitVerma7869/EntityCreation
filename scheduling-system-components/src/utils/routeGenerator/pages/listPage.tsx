import { Entity } from '../../../interfaces/types';
import { generateListPage } from './pageComponents/listPageComp';

export function generateListPageWrapper(config: Entity): string {
  return generateListPage(config);
}