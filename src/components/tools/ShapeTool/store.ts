import { makeAutoObservable } from 'mobx';
import { SquareOutlineIcon } from '../../../assets/icons/SquareOutlineIcon';
import { CircleOutlineIcon } from '../../../assets/icons/CircleOutlineIcon';

class ShapeToolStore {
  data: ShapeToolData = {
    shape: 'square',
    length: 20,
    color: '#000000',
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type ShapeToolData = {
  shape: keyof typeof Shape;
  length: number;
  color: string;
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
