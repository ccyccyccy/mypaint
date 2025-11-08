import { LineToolIcon } from '../../../assets/icons/LineToolIcon';
import { canvasStore } from '../../../store';
import type { GenericTool } from '../type';
import { DetailUI } from './DetailUI';
import { lineToolStore, type LineToolData } from './store';

export const LineTool: GenericTool<LineToolData, typeof lineToolStore> = {
  id: 'lineTool',
  icon: LineToolIcon,
  store: lineToolStore,
  DetailUI: DetailUI,
  onClick: ({ mousePosition: { x, y } }) => {
    const startPosition = lineToolStore.data.startPosition;
    if (!startPosition) {
      lineToolStore.data.startPosition = { x, y };
    } else {
      canvasStore.addLayers({
        startPosition,
        endPosition: { x, y },
        color: lineToolStore.data.color,
        strokeWidth: lineToolStore.data.strokeWidth,
      });
      lineToolStore.data.startPosition = undefined;
    }
  },
  operation: ({ ctx, startPosition, endPosition, color, strokeWidth }) => {
    if (!startPosition || !endPosition) return;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    ctx.lineTo(endPosition.x, endPosition.y);
    console.log('strokeWidth :>> ', strokeWidth);
    ctx.lineWidth = strokeWidth;
    console.log('ctx.lineWidth :>> ', ctx.lineWidth);
    ctx.stroke();
    lineToolStore.data.startPosition = undefined;
  },
};
