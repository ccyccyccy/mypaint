import { FillToolIcon } from '../../../assets/icons/FillToolIcon';
import type { GenericTool } from '../type';
import { DetailUI } from './DetailUI';
import { fillToolStore, type FillToolData } from './store';

export const FillTool: GenericTool<FillToolData, typeof fillToolStore> = {
  id: 'fillTool',
  icon: FillToolIcon,
  store: fillToolStore,
  DetailUI: DetailUI,
  operation: () => {},
};
