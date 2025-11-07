import { FillToolIcon } from '../../../assets/icons/FillToolIcon';
import { canvasStore } from '../../../store';
import type { GenericTool } from '../type';
import { DetailUI } from './DetailUI';
import { fillToolStore, type FillToolData } from './store';

export const FillTool: GenericTool<FillToolData, typeof fillToolStore> = {
  id: 'fillTool',
  icon: FillToolIcon,
  store: fillToolStore,
  DetailUI: DetailUI,
  operation: ({ ctx, mousePosition: { x, y }, color }) => {
    ctx.fillStyle = color;
    ctx.fillRect(
      0,
      0,
      canvasStore.canvasSize.width,
      canvasStore.canvasSize.height,
    );
  },
};
