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
      const canvas = canvasStore.canvas;
      if (!canvas) return;
      canvas.addEventListener('mousemove', drawPreviewLine);
    } else {
      const canvas = canvasStore.canvas;
      if (!canvas) return;
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
  if (!lineToolStore.data.startPosition) return;
  const canvas = canvasStore.previewCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ctx.save();

  ctx.strokeStyle = lineToolStore.data.color;
  ctx.globalAlpha = 0.2;
  ctx.lineWidth = lineToolStore.data.strokeWidth;
  ctx.clearRect(
    0,
    0,
    canvasStore.canvasSize.width,
    canvasStore.canvasSize.height,
  );
  ctx.beginPath();
  ctx.moveTo(
    lineToolStore.data.startPosition.x,
    lineToolStore.data.startPosition.y,
  );
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.restore();
};
