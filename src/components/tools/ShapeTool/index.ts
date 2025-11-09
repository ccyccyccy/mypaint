import { ShapeToolIcon } from '../../../assets/icons/ShapeToolIcon';
import { canvasStore } from '../../../store';
import type { GenericTool } from '../type';
import { DetailUI } from './DetailUI';
import { shapeToolStore, type ShapeToolData } from './store';

export const ShapeTool: GenericTool<ShapeToolData, typeof shapeToolStore> = {
  id: 'shapeTool',
  icon: ShapeToolIcon,
  store: shapeToolStore,
  DetailUI: DetailUI,
  onClick: ({ mousePosition: { x, y } }) => {
    canvasStore.addLayer({ ...shapeToolStore.data, position: { x, y } });
  },
  operation: ({ ctx, position: { x, y }, color, size: length, shape }) => {
    ctx.fillStyle = color;
    switch (shape) {
      case 'square':
        ctx.fillRect(x - length / 2, y - length / 2, length, length);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, length / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'hexagon':
        ctx.beginPath();
        ctx.moveTo(x - length / 4, y - length / 2);
        ctx.lineTo(x + length / 4, y - length / 2);
        ctx.lineTo(x + length / 2, y);
        ctx.lineTo(x + length / 4, y + length / 2);
        ctx.lineTo(x - length / 4, y + length / 2);
        ctx.lineTo(x - length / 2, y);
        ctx.fill();
        break;
      default:
        return;
    }
  },
};
