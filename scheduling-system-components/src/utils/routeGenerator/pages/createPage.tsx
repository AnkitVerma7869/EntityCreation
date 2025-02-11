import { Entity } from '../../../interfaces/types';
import { generateCreatePage } from './pageComponents/createPageComp';

export function generateCreatePageWrapper(config: Entity): string {
  return generateCreatePage(config);
}