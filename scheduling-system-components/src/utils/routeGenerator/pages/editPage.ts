

import { Entity } from '../../../interfaces/types';
import { generateEditPage } from './pageComponents/editPageComp';

export function generateEditPageWrapper(config: Entity): string {
  return generateEditPage(config);
}