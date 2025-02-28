import { Entity } from '../../../interfaces/types';
import { generateViewPage } from './pageComponents/viewPageComp';

export function generateViewPageWrapper(config: Entity): string {
  return generateViewPage(config);
}