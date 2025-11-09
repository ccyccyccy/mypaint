import { makeAutoObservable } from 'mobx';
import { SquareOutlineIcon } from '../../../assets/icons/SquareOutlineIcon';
import { CircleOutlineIcon } from '../../../assets/icons/CircleOutlineIcon';

class ShapeToolStore {
  data: ShapeToolData = {
    position: { x: 0, y: 0 },
    shape: 'square',
    size: 20,
    color: '#000000',
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type ShapeToolData = {
  shape: keyof typeof Shape;
  size: number;
  color: string;
  position: { x: number; y: number };
};

export const Shape = {
  square: {
    Icon: SquareOutlineIcon,
  },
  circle: {
    Icon: CircleOutlineIcon,
  },
} as const;

export const shapeToolStore = new ShapeToolStore();
export const shapeSizes = [20, 30, 40, 60, 80, 100, 120, 140] as const;
