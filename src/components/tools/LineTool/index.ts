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

  onSwitchToOtherTool({ canvas }) {
    lineToolStore.data.startPosition = undefined;
    canvas.removeEventListener('mousemove', drawPreviewLine);
  },

  onClick: ({ mousePosition: { x, y }, canvas }) => {
    const startPosition = lineToolStore.data.startPosition;
    if (!startPosition) {
      lineToolStore.data.startPosition = { x, y };
      canvas.addEventListener('mousemove', drawPreviewLine);
    } else {
      canvas.removeEventListener('mousemove', drawPreviewLine);
      canvasStore.addLayer({
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
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    ctx.lineTo(endPosition.x, endPosition.y);
    ctx.stroke();
  },
};

const drawPreviewLine = (event: MouseEvent) => {
  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    if (!lineToolStore.data.startPosition) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.strokeStyle = lineToolStore.data.color;
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = lineToolStore.data.strokeWidth;
    ctx.beginPath();
    ctx.moveTo(
      lineToolStore.data.startPosition.x,
      lineToolStore.data.startPosition.y,
    );
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  canvasStore.drawPreviewCanvas(draw);
};
