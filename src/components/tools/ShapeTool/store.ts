import { makeAutoObservable } from 'mobx';
import { SquareOutline } from '../../../assets/icons/SquareOutline';
import { CircleOutline } from '../../../assets/icons/CircleOutline';

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
    Icon: SquareOutline,
  },
  circle: {
    Icon: CircleOutline,
  },
} as const;

export const shapeToolStore = new ShapeToolStore();
