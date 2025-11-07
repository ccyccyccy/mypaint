import { ShapeToolIcon } from '../../../assets/icons/ShapeToolIcon';
import type { GenericTool } from '../type';
import { DetailUI } from './DetailUI';
import { shapeToolStore, type ShapeToolData } from './store';

export const ShapeTool: GenericTool<ShapeToolData, typeof shapeToolStore> = {
  id: 'shapeTool',
  icon: ShapeToolIcon,
  store: shapeToolStore,
  DetailUI: DetailUI,
  operation: ({ ctx, mousePosition: { x, y }, color, length }) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, length, length);
  },
};
