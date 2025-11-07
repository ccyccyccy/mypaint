import { LineToolIcon } from '../../../assets/icons/LineToolIcon';
import type { GenericTool } from '../type';
import { DetailUI } from './DetailUI';
import { lineToolStore, type LineToolData } from './store';

export const LineTool: GenericTool<LineToolData, typeof lineToolStore> = {
  id: 'lineTool',
  icon: LineToolIcon,
  store: lineToolStore,
  DetailUI: DetailUI,
  operation: ({ ctx, mousePosition: { x, y }, color, length, line }) => {
    const startPosition = lineToolStore.data.startPosition;
    if (!startPosition) {
      lineToolStore.data.startPosition = { x, y };
    } else {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(startPosition.x, startPosition.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      lineToolStore.data.startPosition = undefined;
    }
  },
};
