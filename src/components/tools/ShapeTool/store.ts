import { makeAutoObservable } from 'mobx';

class ShapeToolStore {
  data: ShapeToolData = {
    selectedShape: 'square',
    length: 20,
    color: '#000000',
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export type ShapeToolData = {
  selectedShape: 'square' | 'circle';
  length: number;
  color: string;
};

export const shapeToolStore = new ShapeToolStore();
