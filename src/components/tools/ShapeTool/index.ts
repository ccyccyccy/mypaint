import { ShapeToolIcon } from '../../../assets/icons/ShapeToolIcon';
import type { GenericTool } from '../type';
import { DetailUI } from './DetailUI';
import { shapeToolStore, type ShapeToolData } from './store';

export const ShapeTool: GenericTool<ShapeToolData, typeof shapeToolStore> = {
  id: 'shapeTool',
  icon: ShapeToolIcon,
  store: shapeToolStore,
  DetailUI: DetailUI,
  operation: ({ ctx, mousePosition: { x, y }, color, length, shape }) => {
    ctx.fillStyle = color;
    switch (shape) {
      case 'square':
        ctx.fillRect(x, y, length, length);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, length / 2, 0, Math.PI * 2);
        ctx.fill();
    }
  },
};
